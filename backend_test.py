#!/usr/bin/env python3
"""
Backend Testing Suite for Raiduix Application
Tests Next.js API routes and MongoDB integration
"""

import requests
import json
import time
import os
from datetime import datetime

# Get base URL from environment
BASE_URL = "https://2033c60b-8be9-4fa7-8735-968caefb6505.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

class RaiduixBackendTester:
    def __init__(self):
        self.test_results = []
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Raiduix-Backend-Tester/1.0'
        })
    
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {test_name}: {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_api_root_endpoint(self):
        """Test the root API endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/")
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == "Hello World":
                    self.log_test("API Root Endpoint", True, "Root endpoint responding correctly", data)
                    return True
                else:
                    self.log_test("API Root Endpoint", False, f"Unexpected response: {data}", data)
                    return False
            else:
                self.log_test("API Root Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Connection error: {str(e)}")
            return False
    
    def test_api_root_alternate(self):
        """Test the alternate root API endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/root")
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == "Hello World":
                    self.log_test("API Root Alternate Endpoint", True, "Alternate root endpoint responding correctly", data)
                    return True
                else:
                    self.log_test("API Root Alternate Endpoint", False, f"Unexpected response: {data}", data)
                    return False
            else:
                self.log_test("API Root Alternate Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False
        except Exception as e:
            self.log_test("API Root Alternate Endpoint", False, f"Connection error: {str(e)}")
            return False
    
    def test_status_post_endpoint(self):
        """Test POST /api/status endpoint"""
        try:
            test_data = {
                "client_name": "RaiduixTestClient"
            }
            response = self.session.post(f"{API_BASE}/status", json=test_data)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'client_name', 'timestamp']
                
                if all(field in data for field in required_fields):
                    if data['client_name'] == test_data['client_name']:
                        self.log_test("Status POST Endpoint", True, "Status creation successful", data)
                        return True, data['id']
                    else:
                        self.log_test("Status POST Endpoint", False, "Client name mismatch", data)
                        return False, None
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Status POST Endpoint", False, f"Missing fields: {missing}", data)
                    return False, None
            else:
                self.log_test("Status POST Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False, None
        except Exception as e:
            self.log_test("Status POST Endpoint", False, f"Request error: {str(e)}")
            return False, None
    
    def test_status_post_validation(self):
        """Test POST /api/status endpoint validation"""
        try:
            # Test without client_name
            response = self.session.post(f"{API_BASE}/status", json={})
            
            if response.status_code == 400:
                data = response.json()
                if 'error' in data and 'client_name is required' in data['error']:
                    self.log_test("Status POST Validation", True, "Validation working correctly", data)
                    return True
                else:
                    self.log_test("Status POST Validation", False, "Unexpected validation response", data)
                    return False
            else:
                self.log_test("Status POST Validation", False, f"Expected 400, got {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Status POST Validation", False, f"Request error: {str(e)}")
            return False
    
    def test_status_get_endpoint(self):
        """Test GET /api/status endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/status")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Status GET Endpoint", True, f"Retrieved {len(data)} status records", {"count": len(data)})
                    return True
                else:
                    self.log_test("Status GET Endpoint", False, "Response is not a list", data)
                    return False
            else:
                self.log_test("Status GET Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False
        except Exception as e:
            self.log_test("Status GET Endpoint", False, f"Request error: {str(e)}")
            return False
    
    def test_cors_headers(self):
        """Test CORS headers are properly set"""
        try:
            response = self.session.options(f"{API_BASE}/status")
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            missing_headers = []
            for header in cors_headers:
                if header not in response.headers:
                    missing_headers.append(header)
            
            if not missing_headers:
                self.log_test("CORS Headers", True, "All CORS headers present", dict(response.headers))
                return True
            else:
                self.log_test("CORS Headers", False, f"Missing CORS headers: {missing_headers}", dict(response.headers))
                return False
        except Exception as e:
            self.log_test("CORS Headers", False, f"Request error: {str(e)}")
            return False
    
    def test_mongodb_connection(self):
        """Test MongoDB connection by creating and retrieving data"""
        try:
            # Create a status record
            success, record_id = self.test_status_post_endpoint()
            if not success:
                self.log_test("MongoDB Connection", False, "Failed to create record")
                return False
            
            # Retrieve records to verify MongoDB is working
            response = self.session.get(f"{API_BASE}/status")
            if response.status_code == 200:
                data = response.json()
                # Check if our created record exists
                found_record = any(record.get('id') == record_id for record in data)
                if found_record:
                    self.log_test("MongoDB Connection", True, "MongoDB read/write operations successful")
                    return True
                else:
                    self.log_test("MongoDB Connection", False, "Created record not found in database")
                    return False
            else:
                self.log_test("MongoDB Connection", False, "Failed to retrieve records from database")
                return False
        except Exception as e:
            self.log_test("MongoDB Connection", False, f"Database operation error: {str(e)}")
            return False
    
    def test_invalid_route(self):
        """Test handling of invalid routes"""
        try:
            response = self.session.get(f"{API_BASE}/nonexistent")
            
            if response.status_code == 404:
                data = response.json()
                if 'error' in data and 'not found' in data['error'].lower():
                    self.log_test("Invalid Route Handling", True, "404 error handled correctly", data)
                    return True
                else:
                    self.log_test("Invalid Route Handling", False, "Unexpected 404 response format", data)
                    return False
            else:
                self.log_test("Invalid Route Handling", False, f"Expected 404, got {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Invalid Route Handling", False, f"Request error: {str(e)}")
            return False
    
    def test_error_handling(self):
        """Test general error handling"""
        try:
            # Test with malformed JSON
            response = requests.post(f"{API_BASE}/status", 
                                   data="invalid json", 
                                   headers={'Content-Type': 'application/json'})
            
            if response.status_code in [400, 500]:
                self.log_test("Error Handling", True, f"Malformed JSON handled with status {response.status_code}")
                return True
            else:
                self.log_test("Error Handling", False, f"Unexpected status for malformed JSON: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Error Handling", False, f"Request error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Raiduix Backend Tests")
        print("=" * 50)
        
        tests = [
            self.test_api_root_endpoint,
            self.test_api_root_alternate,
            self.test_status_post_validation,
            self.test_status_post_endpoint,
            self.test_status_get_endpoint,
            self.test_cors_headers,
            self.test_mongodb_connection,
            self.test_invalid_route,
            self.test_error_handling
        ]
        
        passed = 0
        failed = 0
        
        for test in tests:
            try:
                result = test()
                if result:
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ FAIL - {test.__name__}: Unexpected error: {str(e)}")
                failed += 1
            
            time.sleep(0.5)  # Small delay between tests
        
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {passed} passed, {failed} failed")
        
        if failed == 0:
            print("🎉 All backend tests passed!")
            return True
        else:
            print(f"⚠️  {failed} tests failed. Check logs above for details.")
            return False
    
    def get_summary(self):
        """Get test summary"""
        total = len(self.test_results)
        passed = sum(1 for r in self.test_results if r['success'])
        failed = total - passed
        
        return {
            'total': total,
            'passed': passed,
            'failed': failed,
            'success_rate': (passed / total * 100) if total > 0 else 0,
            'results': self.test_results
        }

if __name__ == "__main__":
    tester = RaiduixBackendTester()
    success = tester.run_all_tests()
    
    # Print detailed summary
    summary = tester.get_summary()
    print(f"\n📈 Success Rate: {summary['success_rate']:.1f}%")
    
    # Save results to file
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(summary, f, indent=2)
    
    print("💾 Test results saved to backend_test_results.json")
    
    exit(0 if success else 1)
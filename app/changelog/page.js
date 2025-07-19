"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { app } from "@/lib/firebase";

export default function ChangelogPage() {
  const [showBugModal, setShowBugModal] = useState(false);
  const [bugCategory, setBugCategory] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [bugSubmitting, setBugSubmitting] = useState(false);
  const [bugSuccess, setBugSuccess] = useState(false);
  const [bugError, setBugError] = useState(null);
  const bugInputRef = useRef();

  // Add missing changelog state and fetching logic
  // Custom dropdown state and options
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const categoryOptions = [
    "Functionality Issue",
    "Visual/Aesthetic Issue",
    "Performance Issue",
    "Security Issue",
    "Data/Content Issue",
    "Crash/Error Issue",
    "Localization/Internationalization Issue",
    "Usability/UX Issue",
    "Other",
  ];

  // Close dropdown on outside click (improved for clarity and reliability)
  useEffect(() => {
    if (!dropdownOpen) return;
    function handle(e) {
      // Check if click is outside the dropdown and button
      const dropdown = document.getElementById("bug-category-dropdown");
      const button = document.getElementById("bug-category-button");
      if (
        dropdown &&
        !dropdown.contains(e.target) &&
        button &&
        !button.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    }
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, [dropdownOpen]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChangelog() {
      setLoading(true);
      setError(null);
      try {
        if (!app) throw new Error("Firebase app is not initialized");
        const db = getFirestore(app);
        const changelogRef = collection(db, "change-logs");
        // Check if collection exists by trying to get at least 1 doc
        const q = query(changelogRef, orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setEntries([]);
          setLoading(false);
          return;
        }
        const data = querySnapshot.docs.map((doc) => {
          const d = doc.data();
          let date = d.date;
          if (date && typeof date === "object" && date.seconds) {
            date = new Date(date.seconds * 1000);
          } else if (typeof date === "string" || date instanceof Date) {
            date = new Date(date);
          } else {
            date = null;
          }
          return {
            id: doc.id,
            version: d.version || "Unversioned",
            changes: Array.isArray(d.changes) ? d.changes : [],
            date,
          };
        });
        setEntries(data);
      } catch (err) {
        console.error(
          "Changelog fetch error:",
          err && (err.code || err.message || err)
        );
        setError(
          "Failed to load changelog. " + (err && err.code ? err.code : "")
        );
      } finally {
        setLoading(false);
      }
    }
    fetchChangelog();
  }, []);

  async function submitBug(e) {
    e.preventDefault();
    setBugSubmitting(true);
    setBugError(null);
    setBugSuccess(false);
    try {
      if (!bugCategory) {
        setBugError("Please select a category.");
        setBugSubmitting(false);
        return;
      }
      const db = getFirestore(app);
      await addDoc(collection(db, "bug-reports"), {
        category: bugCategory,
        description: bugDescription,
        created: new Date(),
      });
      setBugSuccess(true);
      setBugDescription("");
      setBugCategory("");
      setShowBugModal(false);
    } catch (err) {
      setBugError("Failed to submit bug report.");
    } finally {
      setBugSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#181c24] via-[#23283a] to-[#10131a] py-12 px-2 md:px-0 dark">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/raiduix_logo_transparent_bg.PNG"
              alt="RAIDUIX Logo"
              className="h-12 w-12 object-contain drop-shadow-lg"
              style={{ background: "transparent" }}
            />
            <Button asChild variant="ghost" className="glass-button px-4 py-2">
              <a href="/">← Back to Workspace</a>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://x.com/raiduix"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button rounded-lg px-3 py-2 text-blue-200 hover:text-blue-100 transition-all"
            >
              Twitter
            </a>
            <a
              href="mailto:dev.raiduix@outlook.com"
              className="glass-button rounded-lg px-3 py-2 text-blue-200 hover:text-blue-100 transition-all"
            >
              Email
            </a>
            <Button
              variant="outline"
              className="ml-2 px-4 py-2 border-blue-400/30 text-blue-100 hover:bg-blue-900/30"
              onClick={() => setShowBugModal(true)}
            >
              Report Bug
            </Button>
          </div>
        </div>
        {/* Bug Report Modal */}
        {showBugModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <form
              onSubmit={submitBug}
              className="rounded-xl p-8 w-full max-w-md shadow-2xl border border-blue-400/30 flex flex-col gap-5 bg-[#23283a] bg-opacity-95 backdrop-blur-xl"
              style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
            >
              <h2 className="text-2xl font-bold mb-2 text-blue-100 drop-shadow-lg">
                Report a Bug
              </h2>
              {/* Custom dropdown for bug category (improved for UI and readability) */}
              <div className="relative mb-2">
                <button
                  id="bug-category-button"
                  type="button"
                  className={`w-full flex justify-between items-center glass-input rounded-lg p-3 text-base text-blue-100 bg-[#23283a]/80 border border-blue-400/20 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md hover:border-blue-400/40 focus:border-blue-400/60 transition-all ${
                    bugCategory ? "" : "opacity-70"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownOpen((v) => !v);
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen ? "true" : "false"}
                >
                  <span className={bugCategory ? "" : "text-blue-300"}>
                    {bugCategory || "Select a category..."}
                  </span>
                  <svg
                    className="ml-2 w-5 h-5 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul
                    id="bug-category-dropdown"
                    className="absolute z-10 mt-2 w-full rounded-lg shadow-lg border border-blue-400/30 bg-[#23283a] bg-opacity-95 max-h-60 overflow-y-auto animate-fade-in backdrop-blur-xl"
                    tabIndex={-1}
                    role="listbox"
                  >
                    {categoryOptions.map((option) => {
                      const isSelected = bugCategory === option;
                      return (
                        <li
                          key={option}
                          className={`px-4 py-2 cursor-pointer transition-all text-blue-100 border-b border-blue-400/10 last:border-b-0
                            ${
                              isSelected
                                ? "bg-blue-800/90 font-semibold text-blue-200"
                                : ""
                            }
                            hover:bg-blue-900/70 hover:text-blue-100`}
                          style={{
                            backgroundColor: isSelected
                              ? "rgba(30, 58, 138, 0.95)"
                              : "rgba(35, 40, 58, 0.97)",
                            borderRadius: isSelected ? "0.5rem" : undefined,
                          }}
                          onClick={() => {
                            setBugCategory(option);
                            setDropdownOpen(false);
                          }}
                          role="option"
                          aria-selected={isSelected}
                        >
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <textarea
                ref={bugInputRef}
                className="rounded-lg p-3 text-base text-blue-100 bg-[#23283a] bg-opacity-95 border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md placeholder-blue-300"
                rows={4}
                placeholder="Describe the bug..."
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
                required
                autoFocus
                style={{ minHeight: 100, resize: "vertical" }}
              />
              <div className="flex gap-3 justify-end mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="px-5 py-2 rounded-lg border border-blue-400/20 bg-[#23283a] bg-opacity-80 text-blue-200 hover:bg-blue-900/40 hover:text-blue-100 transition-all shadow"
                  onClick={() => setShowBugModal(false)}
                  style={{ minWidth: 90 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  className="px-7 py-2 rounded-lg border border-blue-400/30 bg-blue-800/90 text-blue-100 hover:bg-blue-900/80 transition-all shadow font-semibold"
                  disabled={bugSubmitting}
                  style={{ minWidth: 100 }}
                >
                  {bugSubmitting ? "Sending..." : "Submit"}
                </Button>
              </div>
              {bugError && (
                <div className="text-red-400 text-sm mt-2 font-medium bg-red-900/40 rounded px-3 py-2 border border-red-500/20">
                  {bugError}
                </div>
              )}
              {bugSuccess && (
                <div className="text-green-300 text-sm mt-2 font-medium bg-green-900/30 rounded px-3 py-2 border border-green-400/20">
                  Bug report sent!
                </div>
              )}
            </form>
          </div>
        )}
        <div
          className="rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-400/30 bg-[#23283a] bg-opacity-95 backdrop-blur-xl"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
        >
          <h1 className="text-5xl font-extrabold mb-4 text-center tracking-tight text-blue-100 drop-shadow-lg pb-2">
            Changelog
          </h1>
          <div className="text-lg text-blue-200 text-center mb-12 font-medium opacity-90">
            All the latest updates, improvements, and fixes for RAIDUIX. Stay up
            to date and see what’s new!
          </div>
          {loading ? (
            <div className="text-blue-300 text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-400 text-center font-medium bg-red-900/40 rounded px-3 py-2 border border-red-500/20 inline-block">
              {error}
            </div>
          ) : (
            <div className="relative pl-0 w-full max-w-2xl mx-auto text-left">
              {entries.length === 0 && (
                <div className="text-blue-300 text-center py-8">
                  No changelog entries yet.
                </div>
              )}
              {entries.map((entry, idx) => {
                const dateStr =
                  entry.date instanceof Date && !isNaN(entry.date)
                    ? entry.date.toLocaleDateString()
                    : "";
                return (
                  <div
                    key={entry.id}
                    className="mb-16 relative group flex items-stretch"
                  >
                    {/* Timeline date, dot, and line */}
                    <div className="flex flex-col items-center min-w-[110px] pr-4 select-none">
                      <span className="inline-block text-xs font-mono bg-[#23283a] bg-opacity-90 border border-blue-400/30 text-blue-200 rounded-lg px-3 py-1 mb-2 mt-1 text-center shadow-sm tracking-wide">
                        {dateStr}
                      </span>
                      <div className="relative flex flex-col items-center h-full">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 border-4 border-blue-400/40 shadow-lg z-10"></div>
                        {/* Vertical line for timeline */}
                        <div
                          className="flex-1 w-1 bg-gradient-to-b from-blue-700/60 to-blue-900/30 mt-0.5 mb-0.5"
                          style={{
                            minHeight: idx === entries.length - 1 ? 0 : 56,
                          }}
                        ></div>
                      </div>
                    </div>
                    {/* Timeline content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex flex-col gap-2 rounded-xl p-6 shadow-lg border border-blue-400/20 bg-[#181c24] bg-opacity-95 backdrop-blur-xl transition-all hover:shadow-2xl">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-2xl tracking-tight text-blue-100 drop-shadow-lg">
                            {entry.version}
                          </span>
                        </div>
                        <ul className="list-disc ml-6 mt-1 text-base text-blue-100/90">
                          {Array.isArray(entry.changes) &&
                            entry.changes.map((change, i) => (
                              <li
                                key={i}
                                className="mb-1 leading-relaxed text-blue-100"
                              >
                                {change}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

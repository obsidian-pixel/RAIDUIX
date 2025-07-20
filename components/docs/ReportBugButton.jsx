import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";

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

export default function ReportBugButton() {
  const [showBugModal, setShowBugModal] = useState(false);
  const [bugCategory, setBugCategory] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [bugSubmitting, setBugSubmitting] = useState(false);
  const [bugSuccess, setBugSuccess] = useState(false);
  const [bugError, setBugError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const bugInputRef = useRef();

  useEffect(() => {
    if (!dropdownOpen) return;
    function handle(e) {
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
    <>
      <Button
        variant="outline"
        className="ml-2 px-4 py-2 border-none text-white font-semibold bg-gradient-to-br from-pink-600 via-fuchsia-700 to-red-700 shadow-lg hover:from-pink-700 hover:via-fuchsia-800 hover:to-red-800 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all"
        onClick={() => setShowBugModal(true)}
        style={{ boxShadow: "0 2px 12px 0 rgba(236, 72, 153, 0.25)" }}
      >
        Report Bug
      </Button>
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
                        className={`px-4 py-2 cursor-pointer transition-all text-blue-100 border-b border-blue-400/10 last:border-b-0 ${
                          isSelected
                            ? "bg-blue-800/90 font-semibold text-blue-200"
                            : ""
                        } hover:bg-blue-900/70 hover:text-blue-100`}
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
    </>
  );
}

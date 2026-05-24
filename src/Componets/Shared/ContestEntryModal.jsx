"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

const ContestEntryModal = ({ contest, isOpen, onClose, contestUrl = "" }) => {
  const [submissionLink, setSubmissionLink] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resolvedContestUrl = useMemo(() => {
    const detailsPath = contest?._id ? `/all-contests/${contest._id}` : "";
    if (contestUrl) return contestUrl;

    if (typeof window !== "undefined") {
      return `${window.location.origin}${detailsPath}`;
    }

    return detailsPath;
  }, [contest?._id, contestUrl]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const category = contest?.category
    ? contest.category.split("-").join(" ")
    : "General";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Submit your contest entry
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Paste your task submission link and review the contest details
              below.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Submission link
            </label>
            <input
              value={submissionLink}
              onChange={(event) => setSubmissionLink(event.target.value)}
              placeholder="https://your-submission-link.com/..."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Contest link
            </label>
            <input
              value={resolvedContestUrl}
              readOnly
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Notes (optional)
            </label>
            <textarea
              value={submissionNotes}
              onChange={(event) => setSubmissionNotes(event.target.value)}
              placeholder="Write a brief description of your submission..."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/10"
              style={{ minHeight: "120px" }}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!submissionLink}
              className="w-full rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitted ? "Submitted" : "Submit Entry"}
            </button>
          </div>

          {isSubmitted && (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-900/30 dark:text-emerald-200">
              Your submission details are ready. API integration will send this
              to the backend later.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContestEntryModal;

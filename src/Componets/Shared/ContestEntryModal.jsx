"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { X, Info, Link as LinkIcon, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import useAxiosSecure from "../utils/hooks/useAxiosSecure";
import useTheme from "../utils/hooks/useThemeValue";
import { useQueryClient } from "@tanstack/react-query"; // 🔄 কুয়েরি রিফ্রেশ করার জন্য

const ContestEntryModal = ({
  contest,
  isOpen,
  onClose,
  contestUrl = "",
  userEmail = "user@test.com",
}) => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const queryClient = useQueryClient(); // 🔄 ইনিশিয়ালাইজেশন

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      submissionLink: "",
      submissionNotes: "",
    },
  });

  const resolvedContestUrl = useMemo(() => {
    const detailsPath = contest?._id ? `/all-contests/${contest._id}` : "";
    if (contestUrl) return contestUrl;

    if (typeof window !== "undefined") {
      return `${window.location.origin}${detailsPath}`;
    }

    return detailsPath;
  }, [contest?._id, contestUrl]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const payload = {
        contestId: contest?._id,
        submissionLink: data.submissionLink,
        submissionNotes: data.submissionNotes, // 📝 নোটস পাঠানো হচ্ছে
      };

      // 🎯 সঠিক API এন্ডপয়েন্ট এবং PUT মেথড ব্যবহার করা হলো
      const response = await axiosSecure.put(
        "/api/allcontest/contest-submit",
        payload,
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Entry submitted successfully! 🎉",
          {
            position: "top-right",
            autoClose: 3000,
            theme: isDark ? "dark" : "light",
          },
        );

        // 🔄 ডিটেইলস পেইজের পেমেন্ট স্ট্যাটাস ডাটা ক্যাশ ইনস্ট্যান্ট রিফ্রেশ করা
        queryClient.invalidateQueries([
          "contest-payment",
          contest?._id,
          userEmail,
        ]);

        reset();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        position: "top-right",
        theme: isDark ? "dark" : "light",
      });
    }
  };

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-4 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[85vh] md:max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-slate-950 shadow-2xl border border-slate-200 dark:border-slate-800 transition-all overflow-hidden">
        {/* হেডার */}
        <div className="flex items-start justify-between gap-3 p-5 pb-3 border-b border-slate-100 dark:border-slate-900 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Submit your contest entry
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Review rules and submit your task details below.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCloseModal}
            className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* ফর্ম বডি */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
        >
          {/* Guidelines Banner */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3 text-xs text-blue-900 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-blue-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold">
              <Info size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Submission Guidelines:</span>
            </div>
            <div className="space-y-1 opacity-90 pl-5">
              <p className="flex items-center gap-1.5">
                <LinkIcon size={12} className="shrink-0 text-blue-500" />
                <span>
                  Must be a live link (e.g., <strong>GitHub / Drive</strong>).
                </span>
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="shrink-0 text-blue-500" />
                <span>Provide testing credentials in the notes below.</span>
              </p>
            </div>
          </div>

          {/* Submission Link Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Submission Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              placeholder="https://github.com/your-username/project-repo"
              className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2 text-xs text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-sm outline-none transition focus:ring-2 dark:bg-slate-900 ${
                errors.submissionLink
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100 dark:border-red-500"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700 dark:focus:border-indigo-400"
              }`}
              {...register("submissionLink", {
                required: "Submission link is required",
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                  message: "Please enter a valid URL format",
                },
              })}
            />
            {errors.submissionLink && (
              <span className="text-[11px] font-medium text-red-500 mt-1 block">
                {errors.submissionLink.message}
              </span>
            )}
          </div>

          {/* Contest URL Reference */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Contest URL Reference
            </label>
            <input
              value={resolvedContestUrl}
              readOnly
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-500 shadow-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 select-all"
            />
          </div>

          {/* Required Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Required Credentials & Notes{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Provide necessary details or document links for testing."
              className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2 text-xs text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-sm outline-none transition focus:ring-2 dark:bg-slate-900 ${
                errors.submissionNotes
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100 dark:border-red-500"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700 dark:focus:border-indigo-400"
              }`}
              style={{ minHeight: "130px" }}
              {...register("submissionNotes", {
                required: "Testing notes or credentials are required.",
              })}
            />
            {errors.submissionNotes ? (
              <span className="text-[11px] font-medium text-red-500 mt-1 block">
                {errors.submissionNotes.message}
              </span>
            ) : (
              <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 leading-normal">
                Include exact details or credentials required to review your
                work.
              </p>
            )}
          </div>
        </form>

        {/* ফুটার */}
        <div className="flex gap-2 justify-end p-4 border-t border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-950/60 shrink-0">
          <button
            type="button"
            onClick={handleCloseModal}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Entry"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestEntryModal;

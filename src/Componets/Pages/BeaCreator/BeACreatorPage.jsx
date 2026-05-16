"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "@/Componets/utils/hooks/useAuth";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import useLocationData from "@/Componets/utils/hooks/useLocationData";
import { toast } from "react-toastify";
import {
  MonitorCheck,
  Send,
  Terminal,
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 0, label: "Personal", icon: User },
  { id: 1, label: "Experience", icon: Globe },
  { id: 2, label: "Review", icon: ClipboardList },
];

const BeACreatorPage = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const { locations, regions } = useLocationData();
  const isDark = theme === "dark";
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [deviceVal, setDeviceVal] = useState("yes");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { hasDevice: "yes" } });

  const selectedRegion = watch("region");
  const filteredDistricts = locations
    ? locations.filter((loc) => loc.region === selectedRegion)
    : [];

  const step0Fields = ["phone", "education"];
  const step1Fields = ["region", "district", "ojLink"];

  const goNext = async () => {
    const fields = currentStep === 0 ? step0Fields : step1Fields;
    const valid = await trigger(fields);
    if (!valid) return;
    setCurrentStep((s) => s + 1);
  };

  const goPrev = () => setCurrentStep((s) => s - 1);

  const onSubmit = async (data) => {
    if (data.hasDevice !== "yes") {
      toast.error("Creator হওয়ার জন্য ল্যাপটপ বা পিসি থাকা বাধ্যতামূলক।");
      return;
    }
    try {
      const payload = {
        ...data,
        hasDevice: deviceVal,
        userId: user?.id,
        status: "pending",
        appliedAt: new Date().toISOString(),
      };
      const res = await axiosSecure.post("/api/creator", payload);
      if (res.data.success) {
        setSubmitted(true);
        reset();
        router.push("/profile")
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "আবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      );
    }
  };

  // ─── Styles ───────────────────────────────────────────────
  const base = isDark ? "bg-[#0d0d17] text-white" : "bg-gray-50 text-gray-900";

  const card = isDark
    ? "bg-[#111120] border border-white/[0.07]"
    : "bg-white border border-gray-100";

  const inputCls = (hasErr) =>
    [
      "w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-all duration-150",
      isDark
        ? "bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-indigo-500 focus:bg-white/8"
        : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white",
      hasErr ? (isDark ? "!border-red-500/70" : "!border-red-400") : "",
    ].join(" ");

  const labelCls =
    "block text-xs font-medium mb-1.5 " +
    (isDark ? "text-white/40" : "text-gray-500");

  const sectionCls = isDark
    ? "bg-white/[0.04] border border-white/[0.07]"
    : "bg-gray-50 border border-gray-100";

  // ─── Sub-components ───────────────────────────────────────
  const FieldError = ({ msg }) =>
    msg ? <p className="text-[11px] text-red-500 mt-1">{msg}</p> : null;

  const ReviewRow = ({ label, value, accent }) => (
    <div
      className={
        "flex items-center justify-between py-2.5 px-4 border-b last:border-b-0 " +
        (isDark ? "border-white/[0.06]" : "border-gray-100")
      }
    >
      <span
        className={isDark ? "text-xs text-white/40" : "text-xs text-gray-400"}
      >
        {label}
      </span>
      <span
        className={
          "text-sm font-medium " +
          (accent ? "text-indigo-500" : isDark ? "text-white" : "text-gray-800")
        }
      >
        {value || "—"}
      </span>
    </div>
  );

  // ─── Stepper ──────────────────────────────────────────────
  const Stepper = () => (
    <div
      className={
        "flex items-center px-6 py-3 border-b " +
        (isDark ? "border-white/[0.07]" : "border-gray-100")
      }
    >
      {STEPS.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2">
              <div
                className={[
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                  done
                    ? "bg-green-500 text-white"
                    : active
                      ? "bg-indigo-600 text-white"
                      : isDark
                        ? "bg-white/10 text-white/30"
                        : "bg-gray-100 text-gray-400",
                ].join(" ")}
              >
                {done ? <CheckCircle2 size={13} /> : i + 1}
              </div>
              <span
                className={[
                  "text-xs font-medium",
                  done
                    ? "text-green-500"
                    : active
                      ? "text-indigo-500"
                      : isDark
                        ? "text-white/30"
                        : "text-gray-400",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={[
                  "flex-1 h-px mx-3 transition-all",
                  done
                    ? "bg-green-400/40"
                    : isDark
                      ? "bg-white/10"
                      : "bg-gray-200",
                ].join(" ")}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  // ─── Nav buttons ──────────────────────────────────────────
  const NavButtons = ({ onNext, isLast }) => (
    <div className="flex items-center justify-between mt-6">
      {currentStep > 0 ? (
        <button
          type="button"
          onClick={goPrev}
          className={[
            "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all",
            isDark
              ? "border-white/10 text-white/50 hover:bg-white/5 hover:text-white"
              : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700",
          ].join(" ")}
        >
          <ArrowLeft size={15} /> Back
        </button>
      ) : (
        <span />
      )}
      <button
        type={isLast ? "submit" : "button"}
        onClick={isLast ? undefined : onNext}
        disabled={isSubmitting}
        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all"
      >
        {isLast
          ? isSubmitting
            ? "Submitting…"
            : "Submit application"
          : "Continue"}
        {isLast ? <Send size={14} /> : <ArrowRight size={15} />}
      </button>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className={`min-h-screen py-10 px-4 ${base}`}>
      <div
        className={`max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl ${card}`}
      >
        {/* Header */}
        <div
          className={
            "flex items-center gap-4 px-6 py-5 border-b " +
            (isDark ? "border-white/[0.07]" : "border-gray-100")
          }
        >
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
            <Terminal size={22} className="text-indigo-500" />
          </div>
          <div>
            <h1
              className={
                "text-lg font-semibold " +
                (isDark ? "text-white" : "text-gray-900")
              }
            >
              Become a <span className="text-indigo-500">Creator</span>
            </h1>
            <p
              className={
                isDark ? "text-xs text-white/40" : "text-xs text-gray-400"
              }
            >
              Build contests and grow your community
            </p>
          </div>
        </div>

        {/* Stepper */}
        {!submitted && <Stepper />}

        {/* Success state */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-16 px-8"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <CheckCircle2 size={28} className="text-green-500" />
            </div>
            <h2
              className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Application submitted!
            </h2>
            <p
              className={`text-sm leading-relaxed max-w-xs ${isDark ? "text-white/40" : "text-gray-500"}`}
            >
              We've received your application and will review it within 2–3
              business days. Check your email for updates.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="px-6 py-5">
              <AnimatePresence mode="wait">
                {/* ── Step 0: Personal ── */}
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Full name</label>
                        <input
                          {...register("name")}
                          readOnly
                          defaultValue={user?.name}
                          className={
                            inputCls(false) + " opacity-50 cursor-not-allowed"
                          }
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Email address</label>
                        <input
                          {...register("email")}
                          readOnly
                          defaultValue={user?.email}
                          className={
                            inputCls(false) + " opacity-50 cursor-not-allowed"
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Phone number</label>
                        <input
                          {...register("phone", {
                            required: "Phone is required",
                          })}
                          defaultValue={user?.phone}
                          className={inputCls(!!errors.phone)}
                          placeholder="017XXXXXXXX"
                        />
                        <FieldError msg={errors.phone?.message} />
                      </div>
                      <div>
                        <label className={labelCls}>Education level</label>
                        <select
                          {...register("education", {
                            required: "Select education level",
                          })}
                          className={inputCls(!!errors.education)}
                        >
                          <option value="">Select level</option>
                          <option value="Diploma">
                            Diploma in Engineering
                          </option>
                          <option value="BSC">B.Sc in CSE</option>
                          <option value="MSc">M.Sc in CSE</option>
                          <option value="Other">Other</option>
                        </select>
                        <FieldError msg={errors.education?.message} />
                      </div>
                    </div>

                    {/* Device toggle */}
                    <div
                      className={`flex items-center justify-between p-4 rounded-xl ${sectionCls}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                          <MonitorCheck size={18} className="text-indigo-500" />
                        </div>
                        <div>
                          <p
                            className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}
                          >
                            Personal laptop or PC
                          </p>
                          <p
                            className={`text-xs ${isDark ? "text-white/40" : "text-gray-400"}`}
                          >
                            Required to participate as a creator
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {["yes", "no"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setDeviceVal(opt)}
                            className={[
                              "px-4 py-1.5 rounded-full text-xs font-medium border transition-all",
                              deviceVal === opt
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : isDark
                                  ? "border-white/10 text-white/40 hover:bg-white/5"
                                  : "border-gray-200 text-gray-500 hover:bg-gray-100",
                            ].join(" ")}
                          >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <NavButtons onNext={goNext} isLast={false} />
                  </motion.div>
                )}

                {/* ── Step 1: Experience ── */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>
                          <MapPin size={12} className="inline mr-1 mb-0.5" />
                          Region
                        </label>
                        <select
                          {...register("region", {
                            required: "Region is required",
                          })}
                          className={inputCls(!!errors.region)}
                        >
                          <option value="">Choose region</option>
                          {regions?.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <FieldError msg={errors.region?.message} />
                      </div>
                      <div>
                        <label className={labelCls}>District</label>
                        <select
                          {...register("district", {
                            required: "District is required",
                          })}
                          className={inputCls(!!errors.district)}
                        >
                          <option value="">Choose district</option>
                          {filteredDistricts.map((d) => (
                            <option key={d.district} value={d.district}>
                              {d.district}
                            </option>
                          ))}
                        </select>
                        <FieldError msg={errors.district?.message} />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>
                        <Globe size={12} className="inline mr-1 mb-0.5" />
                        Online judge profile
                      </label>
                      <input
                        {...register("ojLink", {
                          required: "OJ link is required",
                        })}
                        className={inputCls(!!errors.ojLink)}
                        placeholder="Codeforces / LeetCode / StopStalk URL"
                      />
                      <FieldError msg={errors.ojLink?.message} />
                      <p
                        className={`text-[11px] mt-1.5 ${isDark ? "text-white/30" : "text-gray-400"}`}
                      >
                        Paste your public profile link so we can review your
                        activity
                      </p>
                    </div>

                    <NavButtons onNext={goNext} isLast={false} />
                  </motion.div>
                )}

                {/* ── Step 2: Review ── */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3"
                  >
                    <div
                      className={`rounded-xl overflow-hidden border ${isDark ? "border-white/[0.07]" : "border-gray-100"}`}
                    >
                      <div
                        className={`px-4 py-2.5 border-b text-xs font-medium flex items-center gap-2 ${isDark ? "bg-white/[0.03] border-white/[0.07] text-white/40" : "bg-gray-50 border-gray-100 text-gray-400"}`}
                      >
                        <User size={12} /> Personal info
                      </div>
                      <ReviewRow
                        label="Name"
                        value={getValues("name") || user?.name}
                      />
                      <ReviewRow
                        label="Email"
                        value={getValues("email") || user?.email}
                      />
                      <ReviewRow label="Phone" value={getValues("phone")} />
                      <ReviewRow
                        label="Education"
                        value={getValues("education")}
                      />
                    </div>

                    <div
                      className={`rounded-xl overflow-hidden border ${isDark ? "border-white/[0.07]" : "border-gray-100"}`}
                    >
                      <div
                        className={`px-4 py-2.5 border-b text-xs font-medium flex items-center gap-2 ${isDark ? "bg-white/[0.03] border-white/[0.07] text-white/40" : "bg-gray-50 border-gray-100 text-gray-400"}`}
                      >
                        <MapPin size={12} /> Location &amp; experience
                      </div>
                      <ReviewRow label="Region" value={getValues("region")} />
                      <ReviewRow
                        label="District"
                        value={getValues("district")}
                      />
                      <ReviewRow
                        label="OJ profile"
                        value={getValues("ojLink")}
                        accent
                      />
                      <ReviewRow
                        label="Owns a PC / Laptop"
                        value={deviceVal === "yes" ? "Yes ✓" : "No"}
                        accent={deviceVal === "yes"}
                      />
                    </div>

                    <NavButtons onNext={undefined} isLast={true} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BeACreatorPage;

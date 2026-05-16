"use client";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { Mail, Send, User, PenLine, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

const roles = [
  { value: "user",    label: "User",    Icon: User },
  { value: "creator", label: "Creator", Icon: PenLine },
  { value: "admin",   label: "Admin",   Icon: Shield },
];

const AllNewUser = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const router = useRouter();

  const { register, handleSubmit, reset, watch, setValue,
    formState: { isSubmitting, errors } } = useForm({
    defaultValues: { email: "", role: "creator" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/api/auth/invite-user", data);
      if (res.data.success) {
        toast.success("Invitation sent successfully!");
        reset();
        router.push("/dashboard/manage-users")
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error sending invitation");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors
      ${dark ? "bg-[#0b1416]" : "bg-slate-100"}`}>

      <div className={`w-full max-w-md rounded-2xl overflow-hidden border transition-colors
        ${dark ? "bg-[#1a2830] border-[#2a3d47]" : "bg-white border-slate-200"}`}>

        {/* Header */}
        <div className="bg-[#002B36] px-7 pt-7 pb-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 bg-[#C6EB71] rounded-lg flex items-center justify-center
              text-[10px] font-bold text-[#002B36]">CH</div>
            <span className="text-white font-bold text-lg">ContestHub</span>
          </div>

          <span className="inline-flex items-center gap-1.5 bg-[#C6EB71]/10 border
            border-[#C6EB71]/25 rounded-full px-3 py-1 text-[11px] font-semibold
            text-[#C6EB71] uppercase tracking-wider mb-3">
            <Send size={11} /> New invitation
          </span>
          <p className="text-white text-xl font-bold mb-1">Invite a new user</p>
          <p className="text-[#7a9aab] text-[13px]">They'll receive a setup link via email.</p>
        </div>

        {/* Body */}
        <div className="px-7 py-7 space-y-5">

          {/* Email */}
          <div>
            <label className={`block text-[11px] font-semibold uppercase tracking-wider mb-2
              ${dark ? "text-[#7a9aab]" : "text-slate-500"}`}>
              Email address
            </label>
            <div className="relative">
              <Mail size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2
                ${dark ? "text-slate-500" : "text-slate-400"}`} />
              <input
                type="email"
                placeholder="person@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none border
                  transition-all focus:ring-2 focus:ring-[#C6EB71]/30 focus:border-[#C6EB71]
                  ${errors.email
                    ? "border-red-500"
                    : dark
                    ? "bg-[#0f2028] border-[#2a3d47] text-[#e2eef4] placeholder:text-slate-600"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter a valid email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full border border-red-500 flex items-center
                  justify-center text-[9px] font-bold shrink-0">!</span>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role picker */}
          <div>
            <label className={`block text-[11px] font-semibold uppercase tracking-wider mb-2
              ${dark ? "text-[#7a9aab]" : "text-slate-500"}`}>
              Assign role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map(({ value, label, Icon }) => (
                <button key={value} type="button" onClick={() => setValue("role", value)}
                  className={`py-2.5 rounded-xl border text-xs font-semibold flex flex-col
                    items-center gap-1.5 transition-all
                    ${selectedRole === value
                      ? "bg-[#002B36] border-[#C6EB71] text-[#C6EB71]"
                      : dark
                      ? "bg-[#0f2028] border-[#2a3d47] text-[#7a9aab] hover:border-[#C6EB71]/40"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-[#C6EB71]/50"
                    }`}>
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className={`h-px ${dark ? "bg-[#2a3d47]" : "bg-slate-100"}`} />

          {/* Submit */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="w-full flex items-center justify-center gap-2 bg-[#002B36]
              text-[#C6EB71] py-3 rounded-xl text-sm font-bold tracking-wide
              hover:opacity-85 active:scale-[0.98] transition-all
              disabled:bg-slate-400 disabled:text-white disabled:cursor-not-allowed">
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-[#C6EB71]/30 border-t-[#C6EB71]
                  rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <><Send size={15} /> Send invitation</>
            )}
          </button>

          <p className={`text-xs text-center ${dark ? "text-slate-600" : "text-slate-400"}`}>
            Link expires 24 hours after delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllNewUser;
"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Phone, User, Upload, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../utils/hooks/useAxiosSecure";
import { uploadToCloudinary } from "@/app/(Backend)/lib/uploadCloudinary";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisteForm = ({ inputClass, isDark }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let photoUrl = "";

      if (data.photo && data.photo[0]) {
        const uploadResult = await uploadToCloudinary(
          data.photo[0],
          "UserProfiles",
        );

        photoUrl = uploadResult.secure_url;
      }

      const newUser = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        image: photoUrl,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/api/auth/register", newUser);

      if (res.data.success) {
        toast.success("Account created successfully!");
        reset();
        router.push("/auth/login");
        setFileName("");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error Full:", error);
      console.error("Response Error:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Name */}
        <div className="relative">
          <User
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className={inputClass}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            type="email"
            placeholder="Email Address"
            className={inputClass}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            {...register("phone", { required: "Phone number is required" })}
            type="tel"
            placeholder="Phone Number"
            className={inputClass}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Photo Upload */}
        <label
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer text-sm transition-all ${
            isDark
              ? "bg-white/[0.05] border-white/[0.08] text-slate-500 hover:border-violet-500/40"
              : "bg-white border-slate-200 text-slate-400 hover:border-violet-400/40"
          }`}
        >
          <Upload size={16} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{fileName || "Upload Profile Photo"}</span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("photo", {
              required: "Photo is required",
              onChange: (e) => {
                setFileName(e.target.files?.[0]?.name || "");
              },
            })}
          />
        </label>

        {errors.photo && (
          <p className="text-red-500 text-xs mt-1 pl-1">
            {errors.photo.message}
          </p>
        )}

        {/* Password */}
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters required" },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`${inputClass} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 text-white font-bold rounded-xl text-sm transition-all mt-1 ${
            loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:opacity-90 active:scale-[0.98]"
          }`}
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            "Create Free Account"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisteForm;

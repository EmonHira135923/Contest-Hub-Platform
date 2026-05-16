"use client";
import { uploadToCloudinary } from "@/app/(Backend)/lib/uploadCloudinary";
import useAuth from "@/Componets/utils/hooks/useAuth";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useModal from "@/Componets/utils/hooks/useModal";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { EditProfileSkeleton } from "@/Componets/Skeltons/EditpageSkeltons";

const EditProfilepage = () => {
  const { theme } = useTheme();
  const { openModal } = useModal();
  const { user } = useAuth();
  const { id } = useParams();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState("/default-avatar.png");

  const { register, handleSubmit, setValue, watch } = useForm();
  const imageFile = watch("imageFile");

  const isDark = theme === "dark";

  // ইউজার ডাটা লোড হলে ফর্ম ফিল্ডগুলো ফিলাপ হবে
  useEffect(() => {
    if (user) {
      setValue("name", user?.name || "");
      setValue("phone", user?.phone || "");
      setPreview(user?.image || "/default-avatar.png");
    }
  }, [user, setValue]);

  // ইমেজ প্রিভিউ লজিক
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    openModal({
      title: "Confirm Update",
      message: "আপনি কি প্রোফাইল আপডেট করতে চান?",
      type: "success",
      onConfirm: async () => {
        setIsSubmitting(true);
        let finalImageUrl = user?.image;
        try {
          // যদি নতুন ছবি সিলেক্ট করা হয় তবে ক্লাউডিনারিতে আপলোড হবে
          if (data.imageFile && data.imageFile[0]) {
            const uploadRes = await uploadToCloudinary(
              data.imageFile[0],
              "users",
            );
            finalImageUrl = uploadRes.secure_url;
          }

          const response = await axiosSecure.patch(
            `/api/auth/myprofile/${id}`,
            {
              name: data.name,
              phone: data.phone,
              image: finalImageUrl,
            },
          );

          if (response.data) {
            toast.success("Profile Updated successfully!");
            router.push("/profile");
            router.refresh();
          }
        } catch (error) {
          toast.error(
            error?.response?.data?.message || "Failed to update profile",
          );
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  if (!user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 py-12 ${isDark ? "bg-[#0a0a0f]" : "bg-slate-100"}`}
      >
        <EditProfileSkeleton isDark={isDark} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${isDark ? "bg-[#0a0a0f]" : "bg-slate-100"}`}
    >
      <div
        className={`w-full max-w-md rounded-3xl border transition-all duration-300 ${isDark ? "bg-[#13131f] border-white/[0.07] shadow-[0_0_60px_rgba(0,0,0,0.6)]" : "bg-white border-slate-200 shadow-[0_8px_48px_rgba(0,0,0,0.10)]"}`}
      >
        <div
          className={`h-1 w-full rounded-t-3xl ${isDark ? "bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600" : "bg-gradient-to-r from-indigo-400 via-violet-500 to-indigo-400"}`}
        />

        <div className="px-8 pt-8 pb-9">
          <div className="mb-7">
            <span
              className={`text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full ${isDark ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-indigo-50 text-indigo-500 border border-indigo-100"}`}
            >
              Account
            </span>
            <h1
              className={`mt-3 text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Edit Profile
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Avatar Preview */}
            <div className="flex flex-col items-center gap-2 py-2">
              <div
                className={`relative h-24 w-24 rounded-full overflow-hidden ring-2 ${isDark ? "ring-violet-500/40 shadow-[0_0_24px_rgba(139,92,246,0.2)]" : "ring-indigo-300 shadow-[0_4px_20px_rgba(99,102,241,0.18)]"}`}
              >
                <Image
                  fill
                  src={preview}
                  alt="avatar"
                  className="object-cover"
                />
              </div>
              <p
                className={`text-sm font-semibold ${isDark ? "text-white/60" : "text-slate-600"}`}
              >
                {user?.email}
              </p>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label
                className={`block text-[10px] font-bold uppercase tracking-[0.16em] ${isDark ? "text-white/30" : "text-slate-400"}`}
              >
                Full Name
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className={`w-full px-4 py-3.5 rounded-2xl text-[14px] font-medium outline-none border transition-all duration-200 ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] text-white focus:border-violet-500/50"
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-400"
                }`}
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label
                className={`block text-[10px] font-bold uppercase tracking-[0.16em] ${isDark ? "text-white/30" : "text-slate-400"}`}
              >
                Phone Number
              </label>
              <input
                {...register("phone")}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3.5 rounded-2xl text-[14px] font-medium outline-none border transition-all duration-200 ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] text-white focus:border-violet-500/50"
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-400"
                }`}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label
                className={`block text-[10px] font-bold uppercase tracking-[0.16em] ${isDark ? "text-white/30" : "text-slate-400"}`}
              >
                Profile Photo
              </label>
              <label
                className={`flex flex-col items-center justify-center w-full py-5 rounded-2xl border border-dashed cursor-pointer transition-all duration-200 ${
                  isDark
                    ? "bg-white/[0.02] border-white/[0.12] hover:bg-violet-500/[0.04]"
                    : "bg-slate-50 border-slate-200 hover:bg-indigo-50/50"
                }`}
              >
                <span className="text-xs font-medium text-gray-500">
                  {imageFile?.[0] ? imageFile[0].name : "Click to change photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("imageFile")}
                />
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => router.back()}
                className={`flex-1 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-200 ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] text-white/40"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-[2] py-3.5 rounded-2xl text-sm font-black text-white transition-all duration-200 disabled:opacity-40 ${
                  isDark
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_4px_20px_rgba(139,92,246,0.35)]"
                    : "bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_4px_16px_rgba(99,102,241,0.30)]"
                }`}
              >
                {isSubmitting ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilepage;

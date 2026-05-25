"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import { uploadToCloudinary } from "@/app/(Backend)/lib/uploadCloudinary";
import { toast } from "react-toastify";
import useAuth from "@/Componets/utils/hooks/useAuth";

const CreateContestPage = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = "";

      // ১. Cloudinary-তে ইমেজ আপলোড
      if (data.imageFile && data.imageFile[0]) {
        const uploadResult = await uploadToCloudinary(
          data.imageFile[0],
          "ContestImages",
        );
        imageUrl = uploadResult.secure_url;
      }

      // ২. ডেটা অবজেক্ট তৈরি
      const contestData = {
        title: data.name,
        description: data.description,
        category: data.type,
        prize: parseFloat(data.prizeMoney),
        registrationFee: parseFloat(data.price),
        instruction: data.instruction,
        image: imageUrl,
        deadline: data.deadline,
        isWinner: false, // নতুন ফিল্ড: বিজয়ী ঘোষণা করা হয়েছে কিনা
        contestStatus: "active", // নতুন ফিল্ড: কনটেস্টের স্ট্যাটাস
        contestSubmissionStatus: "not-submitted", // নতুন ফিল্ড: কনটেস্ট সাবমিশন স্ট্যাটাস
        participantsCount: 0,
        adminStatus: "pending",
        paymentStatus: "unpaid", // পেমেন্ট স্ট্যাটাস
        creatorEmail: user?.email, // ক্রিয়েটরের ইমেল
        createdAt: new Date(),
      };

      // ৩. axiosSecure ব্যবহার করে API কল
      const response = await axiosSecure.post("/api/allcontest", contestData);

      if (response.data.success) {
        toast.success("Contest Created Successfully!");
        reset();
      }
    } catch (error) {
      console.error("Submission Error:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to create contest. Try again.";
      toast.error(errorMsg); // Swal এর পরিবর্তে toast ব্যবহার করা হয়েছে
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = `w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-white shadow-inner"
      : "bg-white border-gray-300 text-black shadow-sm"
  }`;

  return (
    <div
      className={`min-h-screen py-10 px-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-xl shadow-2xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center border-b pb-4 border-blue-500">
          Create New Contest
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Contest Name</label>
              <input
                {...register("name", { required: "Contest name is required" })}
                className={inputStyle}
                placeholder="Ex: UI/UX Design Challenge"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-2">Contest Banner</label>
              <input
                type="file"
                {...register("imageFile", { required: "Image is required" })}
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className={inputStyle}
              rows="4"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Entry Fee ($)</label>
              <input
                type="number"
                {...register("price", { required: true, min: 0 })}
                className={inputStyle}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Prize Money ($)</label>
              <input
                type="number"
                {...register("prizeMoney", { required: true, min: 1 })}
                className={inputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Contest Category</label>
              <select {...register("type")} className={inputStyle}>
                {/* Software & IT */}
                <option value="software-development">
                  Software & App Development
                </option>
                <option value="hackathon">Hackathon (Coding)</option>
                <option value="ai-machine-learning">
                  AI & Machine Learning
                </option>
                <option value="cyber-security">Cyber Security (CTF)</option>

                {/* Engineering & Design */}
                <option value="robotics-automation">
                  Robotics & Automation
                </option>
                <option value="electrical-circuit-design">
                  Electrical Circuit Design
                </option>
                <option value="mechanical-design-cad">
                  Mechanical Design (CAD/CAM)
                </option>
                <option value="civil-architectural-design">
                  Architecture & Civil Design
                </option>

                {/* Research & Innovation */}
                <option value="technical-paper-presentation">
                  Technical Paper Presentation
                </option>
                <option value="industrial-innovation">
                  Industrial Innovation
                </option>
                <option value="data-science-analytics">
                  Data Science & Analytics
                </option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Deadline</label>
              <Controller
                control={control}
                name="deadline"
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    className={inputStyle}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="MMMM d, yyyy"
                    minDate={new Date()}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Instruction</label>
            <textarea
              {...register("instruction", { required: true })}
              className={inputStyle}
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Submit Contest"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContestPage;

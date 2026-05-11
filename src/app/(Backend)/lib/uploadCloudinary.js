// app/(Backend)/lib/cloudanry.js

export const uploadToCloudinary = async (file, folderName) => {
  // ১. ফাইল বা ফোল্ডারের নাম না থাকলে এরর দিবে
  if (!file) return null;
  
  if (!folderName) {
    throw new Error("Folder name is required for Cloudinary upload");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  // ২. ডাইনামিক ফোল্ডার পাথ
  formData.append("folder", `ContestHub/${folderName}`);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || "Cloudinary Upload Failed");
    }

    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
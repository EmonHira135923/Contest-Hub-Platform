"use client";
import { ThemeContext } from "@/Componets/Provider/ThemeProvider";
import { useContext } from "react"; // React.use এর বদলে useContext ব্যবহার করুন

const useTheme = () => {
  const context = useContext(ThemeContext);

  // যদি কনটেক্সট খুঁজে না পায় (যেমন লোডিং এর সময়), তবে এরর না দিয়ে ডিফল্ট ভ্যালু দিবে
  if (!context) {
    return { theme: "light", toggleTheme: () => {}, setTheme: () => {} };
  }

  return context;
};

export default useTheme;

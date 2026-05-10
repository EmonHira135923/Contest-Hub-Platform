"use client";
import { ThemeContext } from "@/Componets/Provider/ThemeProvider";
import React, { use } from "react";

const useTheme = () => {
  const Themeinfo = use(ThemeContext);
  return Themeinfo;
};

export default useTheme;

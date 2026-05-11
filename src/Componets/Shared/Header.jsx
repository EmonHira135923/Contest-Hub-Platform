"use client";
import React from "react";

import { usePathname } from "next/navigation";
import Navvar from "./Navvar";

const Header = () => {
  const pathName = usePathname();
  if (pathName.startsWith("/auth")) return null;
  if (pathName.startsWith("/dashboard")) return null;
  return (
    <header className="sticky top-0 z-50">
      <Navvar />
    </header>
  );
};

export default Header;

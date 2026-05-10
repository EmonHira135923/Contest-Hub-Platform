"use client";
import React from "react";

import { usePathname } from "next/navigation";
import Navvar from "./Navvar";

const Header = () => {
  const pathName = usePathname();
  if (pathName.startsWith("/auth")) return <></>;
  if (pathName.startsWith("/dashboard")) return <></>;
  return (
    <div>
      <header>
        <Navvar />
      </header>
    </div>
  );
};

export default Header;

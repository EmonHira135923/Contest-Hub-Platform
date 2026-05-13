"use client";
import { ModalContext } from "@/Componets/Provider/ModalContext";
import { useContext } from "react";

const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
    throw new Error("useModal must be used within an ModalContext");
  }
  return context;
};

export default useModal;
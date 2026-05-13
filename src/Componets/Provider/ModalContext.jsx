"use client";
import { createContext, useState } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import useTheme from "../utils/hooks/useThemeValue";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [config, setConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: null,
  });

  const openModal = ({ title, message, type = "info", onConfirm = null }) => {
    setConfig({ isOpen: true, title, message, type, onConfirm });
    document.getElementById("global_app_modal").showModal();
  };

  const accent =
    config.type === "error"
      ? "from-red-500 to-rose-500"
      : config.type === "success"
        ? "from-emerald-500 to-teal-500"
        : "from-violet-500 to-indigo-500";

  const iconBg =
    config.type === "error"
      ? isDark
        ? "bg-red-500/10 ring-1 ring-red-500/20"
        : "bg-red-50 ring-1 ring-red-200"
      : config.type === "success"
        ? isDark
          ? "bg-emerald-500/10 ring-1 ring-emerald-500/20"
          : "bg-emerald-50 ring-1 ring-emerald-200"
        : isDark
          ? "bg-violet-500/10 ring-1 ring-violet-500/20"
          : "bg-indigo-50 ring-1 ring-indigo-200";

  const confirmBtn =
    config.type === "error"
      ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-[0_4px_16px_rgba(239,68,68,0.35)]"
      : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_4px_16px_rgba(139,92,246,0.35)]";

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}

      <dialog
        id="global_app_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-md"
      >
        <div
          className={`modal-box p-0 overflow-hidden border rounded-3xl transition-all duration-300 ${
            isDark
              ? "bg-[#13131f] border-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
              : "bg-white border-slate-200 shadow-[0_24px_80px_rgba(0,0,0,0.14)]"
          }`}
        >
          {/* Gradient accent bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />

          <div className="p-7">
            {/* Icon + text */}
            <div className="flex items-start gap-4">
              <div className={`p-2.5 rounded-2xl flex-shrink-0 ${iconBg}`}>
                {config.type === "error" && (
                  <AlertCircle className="text-red-500" size={22} />
                )}
                {config.type === "success" && (
                  <CheckCircle2 className="text-emerald-500" size={22} />
                )}
                {config.type === "info" && (
                  <Info className="text-violet-500" size={22} />
                )}
              </div>

              <div className="flex-1 pt-0.5">
                <h3
                  className={`text-[17px] font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {config.title}
                </h3>
                <p
                  className={`mt-1.5 text-[13.5px] leading-relaxed ${isDark ? "text-white/40" : "text-slate-500"}`}
                >
                  {config.message}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              className={`my-6 border-t ${isDark ? "border-white/[0.06]" : "border-slate-100"}`}
            />

            {/* Actions */}
            <div className="modal-action mt-0 flex gap-3">
              <form method="dialog" className="flex gap-3 w-full">
                <button
                  className={`flex-1 py-3 px-4 rounded-2xl text-sm font-semibold border transition-all duration-200 ${
                    isDark
                      ? "bg-white/[0.04] border-white/[0.08] text-white/40 hover:bg-white/[0.08] hover:text-white/70"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Cancel
                </button>

                {config.onConfirm && (
                  <button
                    onClick={config.onConfirm}
                    className={`flex-[2] py-3 px-4 rounded-2xl text-sm font-black text-white border-none transition-all duration-200 ${confirmBtn}`}
                  >
                    Confirm
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Click-outside closes */}
        <form method="dialog" className="modal-backdrop">
          <button />
        </form>
      </dialog>
    </ModalContext.Provider>
  );
}

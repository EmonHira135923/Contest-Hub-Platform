"use client";

import useCheckout from "@/Componets/utils/hooks/useCheckout";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

const PaymentForm = ({ contest }) => {
  const { handleCheckout, isLoading, error } = useCheckout(contest);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isFree = contest.registrationFee <= 0;
  const isPaid = contest?.payment === "paid";

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: isDark
          ? "linear-gradient(145deg, #1e1b2e 0%, #16131f 100%)"
          : "linear-gradient(145deg, #ffffff 0%, #f8f7ff 100%)",
        border: isDark ? "1px solid #2e2a45" : "1px solid #ede9fe",
        boxShadow: isDark
          ? "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 25px 60px rgba(99,85,255,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
      }}
    >
      {/* Decorative top band */}
      <div
        style={{
          background:
            "linear-gradient(90deg, #7c3aed 0%, #6366f1 40%, #38bdf8 100%)",
          height: "3px",
        }}
      />

      {/* Background glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", padding: "40px" }}>
        {/* Badge */}
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{
              background: isDark
                ? "rgba(99,102,241,0.18)"
                : "rgba(99,102,241,0.08)",
              color: isDark ? "#a5b4fc" : "#6366f1",
              border: isDark
                ? "1px solid rgba(99,102,241,0.3)"
                : "1px solid rgba(99,102,241,0.2)",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "0.12em",
              padding: "4px 14px",
              borderRadius: "999px",
              textTransform: "uppercase",
            }}
          >
            Contest Registration
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontWeight: "800",
            fontSize: "1.875rem",
            lineHeight: "1.2",
            color: isDark ? "#f1f0ff" : "#1e1b4b",
            marginBottom: "2rem",
            letterSpacing: "-0.02em",
          }}
        >
          {contest.title}
        </h2>

        {/* Details grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "2rem",
          }}
        >
          <DetailCard
            label="Category"
            value={contest.category || "General"}
            isDark={isDark}
          />
          <DetailCard
            label="Registration Fee"
            value={isFree ? "Free" : `$${contest.registrationFee}`}
            highlight={!isFree}
            isDark={isDark}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: isDark
              ? "1px dashed rgba(255,255,255,0.08)"
              : "1px dashed rgba(0,0,0,0.08)",
            marginBottom: "2rem",
          }}
        />

        {/* Stripe notice */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            background: isDark
              ? "rgba(255,255,255,0.04)"
              : "rgba(99,102,241,0.04)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid rgba(99,102,241,0.1)",
            borderRadius: "16px",
            padding: "16px 20px",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              color: isDark ? "#818cf8" : "#6366f1",
              marginTop: "2px",
              flexShrink: 0,
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </span>
          <p
            style={{
              fontSize: "13px",
              color: isDark ? "#94a3b8" : "#64748b",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            You'll be securely redirected to{" "}
            <span
              style={{
                fontWeight: "700",
                color: isDark ? "#e2e8f0" : "#1e293b",
              }}
            >
              Stripe
            </span>{" "}
            to complete your payment. Your card details are never stored on our
            servers.
          </p>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isLoading || isFree}
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            borderRadius: "16px",
            padding: "16px 24px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: "700",
            fontSize: "15px",
            color: "#ffffff",
            border: "none",
            cursor: isLoading || isFree ? "not-allowed" : "pointer",
            opacity: isLoading || isFree ? 0.55 : 1,
            background: isDark
              ? "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)"
              : "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
            boxShadow: isDark
              ? "0 8px 24px rgba(99,102,241,0.35)"
              : "0 8px 24px rgba(99,102,241,0.3)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            if (!isLoading && !isFree) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = isDark
                ? "0 14px 36px rgba(99,102,241,0.5)"
                : "0 14px 36px rgba(99,102,241,0.45)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = isDark
              ? "0 8px 24px rgba(99,102,241,0.35)"
              : "0 8px 24px rgba(99,102,241,0.3)";
          }}
        >
          <span
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {isLoading ? (
              <>
                <Spinner />
                Starting checkout…
              </>
            ) : isPaid ? (
              "Already Paid"
            ) : (
              <>
                <StripeIcon />
                Pay with Stripe
              </>
            )}
          </span>
        </button>

        {/* Paid contest warning */}
        {isPaid && (
          <p
            style={{
              marginTop: "16px",
              textAlign: "center",
              fontSize: "13px",
              fontWeight: "600",
              color: isDark ? "#34d399" : "#047857",
            }}
          >
            This contest is already paid. Thank you for your registration.
          </p>
        )}

        {/* Free contest warning */}
        {isFree && (
          <p
            style={{
              marginTop: "16px",
              textAlign: "center",
              fontSize: "13px",
              fontWeight: "600",
              color: isDark ? "#fbbf24" : "#d97706",
            }}
          >
            This contest has no registration fee — no payment required.
          </p>
        )}

        {/* Error */}
        {error && !isFree && (
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "13px",
              background: isDark ? "rgba(239,68,68,0.1)" : "#fef2f2",
              border: isDark
                ? "1px solid rgba(239,68,68,0.2)"
                : "1px solid #fecaca",
              color: isDark ? "#fca5a5" : "#dc2626",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ flexShrink: 0 }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            {error}
          </div>
        )}

        {/* Secure badge */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            color: isDark ? "#475569" : "#94a3b8",
            fontSize: "12px",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secured by Stripe · SSL encrypted
        </div>
      </div>
    </div>
  );
};

/* ── Sub-components ─────────────────────────────────────────── */

const DetailCard = ({ label, value, highlight = false, isDark }) => (
  <div
    style={{
      borderRadius: "14px",
      padding: "16px 20px",
      background: isDark ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.04)",
      border: isDark
        ? "1px solid rgba(255,255,255,0.07)"
        : "1px solid rgba(99,102,241,0.1)",
    }}
  >
    <p
      style={{
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: isDark ? "#64748b" : "#94a3b8",
        marginBottom: "6px",
        margin: "0 0 6px 0",
      }}
    >
      {label}
    </p>
    <p
      style={{
        fontSize: "18px",
        fontWeight: "800",
        color: highlight
          ? isDark
            ? "#818cf8"
            : "#6366f1"
          : isDark
            ? "#f1f0ff"
            : "#1e1b4b",
        margin: 0,
      }}
    >
      {value}
    </p>
  </div>
);

const Spinner = () => (
  <svg
    style={{ animation: "spin 1s linear infinite" }}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </svg>
);

const StripeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.931 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
  </svg>
);

export default PaymentForm;

import React from "react";

const PaymentsTable = ({
  isDark,
  payments,
  StatusBadge,
  currentPage,
  itemsPerPage,
  formDate: formatDate,
}) => {
  return (
    <div>
      <table className="w-full min-w-[700px] border-collapse text-left text-sm">
        <thead>
          <tr
            className={`border-b text-[11px] font-semibold uppercase tracking-widest ${
              isDark
                ? "bg-slate-800/60 border-slate-700 text-slate-400"
                : "bg-slate-50 border-slate-100 text-slate-400"
            }`}
          >
            <th className="px-5 py-3.5 w-14 text-center">#</th>
            <th className="px-5 py-3.5">Transaction ID</th>
            <th className="px-5 py-3.5">Contest</th>
            <th className="px-5 py-3.5">Amount</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5 text-right">Date</th>
          </tr>
        </thead>
        <tbody
          className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-100"}`}
        >
          {payments.map((payment, index) => (
            <tr
              key={payment._id}
              className={`transition-colors ${
                isDark ? "hover:bg-slate-800/40" : "hover:bg-slate-50/80"
              }`}
            >
              {/* Serial */}
              <td className="px-5 py-4 text-center">
                <span
                  className={`text-xs font-mono font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </span>
              </td>

              {/* Transaction ID */}
              <td className="px-5 py-4">
                <span
                  className={`font-mono text-xs font-semibold ${isDark ? "text-blue-400" : "text-blue-600"}`}
                >
                  {payment.transactionId}
                </span>
              </td>

              {/* Contest title */}
              <td className="px-5 py-4">
                <span
                  className={`font-medium text-sm ${isDark ? "text-slate-200" : "text-slate-800"}`}
                >
                  {payment.contestTitle || "N/A"}
                </span>
              </td>

              {/* Amount */}
              <td className="px-5 py-4">
                <span
                  className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}
                >
                  {payment.amount}{" "}
                  <span
                    className={`text-xs font-normal uppercase ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    {payment.currency || "usd"}
                  </span>
                </span>
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <StatusBadge status={payment.paymentStatus} />
              </td>

              {/* Date */}
              <td className="px-5 py-4 text-right">
                <span
                  className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  {formatDate(payment.paidAt)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;

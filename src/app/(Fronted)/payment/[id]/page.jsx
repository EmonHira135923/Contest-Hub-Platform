import AuthGuard from "@/Componets/Shared/AuthGuard";
import PaymentForm from "@/Componets/Pages/Payments/PaymentForm";
import React from "react";
import { ObjectId } from "mongodb";
import { getAllContests } from "@/app/(Backend)/lib/dbConnect";

const PaymentPage = async ({ params }) => {
  const resolvedParams = await params;
  const contestId = resolvedParams?.id;

  if (!contestId || !ObjectId.isValid(contestId)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold">Invalid payment link</h1>
          <p className="mt-2 text-slate-500">Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  const collection = await getAllContests();
  const contest = await collection.findOne({ _id: new ObjectId(contestId) });

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold">Contest not found</h1>
          <p className="mt-2 text-slate-500">The contest for this payment page does not exist.</p>
        </div>
      </div>
    );
  }

  const safeContest = { ...contest, _id: contest._id.toString() };

  return (
    <AuthGuard>
      <div className="min-h-screen py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <PaymentForm contest={safeContest} />
        </div>
      </div>
    </AuthGuard>
  );
};

export default PaymentPage;

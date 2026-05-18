"use client";
import React from 'react';
import useTheme from '../utils/hooks/useThemeValue';

const TableSkeleton = () => {
  const {theme} = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="w-full animate-pulse space-y-4">
      {/* Search Bar Skeleton */}
      <div className={`h-10 ${isDark ? "bg-neutral-800" : "bg-gray-200"} rounded-lg w-full max-w-md`}></div>

      {/* Table Skeleton */}
      <div className={`border ${isDark ? "border-neutral-800" : "border-gray-200"} rounded-xl overflow-hidden shadow-sm`}>
        <div className={`h-12 w-full ${isDark ? "bg-neutral-900 border-b border-neutral-800" : "bg-gray-50 border-b border-gray-200"}`}></div>
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className={`flex p-4 ${isDark ? "border-b border-neutral-900" : "border-b border-gray-100"} space-x-4 items-center justify-between`}>
            <div className={`h-5 ${isDark ? "bg-neutral-800" : "bg-gray-200"} rounded w-1/4`}></div>
            <div className={`h-5 ${isDark ? "bg-neutral-800" : "bg-gray-200"} rounded w-1/6`}></div>
            <div className={`h-5 ${isDark ? "bg-neutral-800" : "bg-gray-200"} rounded w-1/6`}></div>
            <div className={`h-5 ${isDark ? "bg-neutral-800" : "bg-gray-200"} rounded w-1/6`}></div>
            <div className={`h-8 ${isDark ? "bg-neutral-800" : "bg-gray-200"} rounded w-1/4`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
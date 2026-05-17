// lib/generateTrackingId.js

export const generateTrackingId = () => {
  // বর্তমান সময়ের শেষ ৫ ডিজিট
  const timestamp = Date.now().toString().slice(-5);
  
  // ৪ অক্ষরের একটি র‍্যান্ডম স্ট্রিং (A-Z এবং 0-9 এর মিশ্রণ)
  const randomStr = Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase();
    
  // একটি প্রফেশনাল ফরম্যাট: CON (Contest) - ৫টি সংখ্যা - ৪টি অক্ষর
  return `CON-${timestamp}-${randomStr}`;
};
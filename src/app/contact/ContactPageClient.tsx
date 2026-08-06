"use client";


import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";

export default function ContactPageClient() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "direct";

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-navy mb-4">Get in Touch</h1>
        <p className="text-gray-600 mb-8">Source: {source}</p>
        <Button>Contact Us</Button>
      </div>
    </div>
  );
}

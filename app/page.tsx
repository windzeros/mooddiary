"use client";

import { useSession } from "next-auth/react";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthButton } from "@/components/auth/auth-button";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">무드 다이어리</h1>
          <p className="text-gray-600">
            당신의 감정을 기록하고 분석해보세요
          </p>
        </div>
        <AuthForm />
        <div className="flex justify-center">
          <AuthButton />
        </div>
      </div>
    </div>
  );
}

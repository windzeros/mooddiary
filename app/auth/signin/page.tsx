"use client";

import { AuthButton } from "@/components/auth/auth-button";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-8 rounded-lg p-6 shadow-lg">
        <h1 className="text-center text-2xl font-bold">로그인</h1>
        <p className="text-center text-gray-600">
          소셜 계정으로 로그인하여 일기를 작성해보세요
        </p>
        <AuthForm />
        <div className="flex justify-center">
          <AuthButton />
        </div>
      </div>
    </div>
  );
}

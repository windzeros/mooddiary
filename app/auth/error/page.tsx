"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-lg p-6 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-red-600">
          로그인 오류
        </h1>
        <p className="text-center text-gray-600">
          {error || "로그인 중 오류가 발생했습니다."}
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

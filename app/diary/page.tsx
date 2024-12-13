"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DiaryEditor } from "@/components/diary/diary-editor";

export default function DiaryPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/");
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">오늘의 일기</h1>
      <DiaryEditor />
    </main>
  );
}

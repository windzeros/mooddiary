"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function DiaryEditor() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to save diary");
      }

      router.push("/");
    } catch (error) {
      console.error("Failed to save diary:", error);
      alert("일기 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="오늘의 제목을 입력하세요"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 하루는 어땠나요?"
          className="min-h-[200px]"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/")}>
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "저장 중..." : "저장하기"}
        </Button>
      </div>
    </form>
  );
}

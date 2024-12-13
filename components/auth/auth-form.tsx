"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // 로그인 처리
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // NextAuth 세션 생성
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      }
    } else {
      // 회원가입 처리
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setError("이메일 인증을 위한 링크를 보냈습니다. 이메일을 확인해주세요.");
      }
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-center">
        {isLogin ? "로그인" : "회원가입"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          {isLogin ? "로그인" : "회원가입"}
        </Button>
      </form>
      <div className="text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-500 hover:underline"
        >
          {isLogin
            ? "계정이 없으신가요? 회원가입"
            : "이미 계정이 있으신가요? 로그인"}
        </button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            또는 소셜 로그인
          </span>
        </div>
      </div>
    </div>
  );
}

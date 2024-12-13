"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Button disabled>Loading...</Button>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex gap-2">
        <Button onClick={() => signIn("github")}>
          GitHub로 로그인
        </Button>
        <Button onClick={() => signIn("google")}>
          Google로 로그인
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{session?.user?.name || "사용자"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()}>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

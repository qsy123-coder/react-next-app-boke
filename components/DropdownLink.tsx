"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"; // ← 新增导入
import { ChevronDown, PenLine, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
const DropdownLink = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* 使用 Button 组件替换原生 button */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-white/5 px-2.5 h-9 rounded-full group outline-none"
        >
          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />

          {/* Avatar with gradient border */}
          <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-pink-300 p-[2px] hover:scale-105 transition-transform">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1a1a1c] text-xs font-medium text-white">
              ?
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 rounded-xl bg-[#1a1a1c] border border-white/[0.08] shadow-xl shadow-black/20 mt-2"
      >
        <DropdownMenuItem asChild>
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <LogIn className="h-4 w-4" />
            登录
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/register"
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <UserPlus className="h-4 w-4" />
            注册账号
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownLink;

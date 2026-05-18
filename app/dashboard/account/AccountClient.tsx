'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Camera } from "lucide-react";
import { Toast } from "@/components/ui/toast";
import { FormSubmitButton } from "@/components/ui/toast";
import { updateProfileAction, updatePasswordAction } from './actions';
import type { Profile } from '@/types';

type AccountClientProps = {
  profile: Profile;
};

export function AccountClient({ profile }: AccountClientProps) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  async function handleProfileSubmit(formData: FormData) {
    const result = await updateProfileAction(formData);
    setToast({ message: result.message, type: result.success ? 'success' : 'error' });
  }

  async function handlePasswordSubmit(formData: FormData) {
    const result = await updatePasswordAction(formData);
    setToast({ message: result.message, type: result.success ? 'success' : 'error' });
  }

  const initials = profile.first_name
    ? profile.first_name.substring(0, 2).toUpperCase()
    : profile.email.substring(0, 2).toUpperCase();

  return (
    <>
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">账户设置</h1>
            <p className="text-muted-foreground mt-1">管理你的账户信息和个人资料</p>
          </div>

          <form action={handleProfileSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>更新你的个人信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button type="button" variant="outline" size="sm" disabled>
                      <Camera className="h-4 w-4 mr-2" />
                      更换头像
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG 或 GIF. 最大 2MB（即将推出）</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="first_name">姓名</Label>
                  <Input 
                    id="first_name" 
                    name="first_name"
                    defaultValue={profile.first_name || ''} 
                    placeholder="输入你的姓名"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={profile.email} 
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">邮箱地址无法修改</p>
                </div>

                <FormSubmitButton className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  保存更改
                </FormSubmitButton>
              </CardContent>
            </Card>
          </form>

          <form action={handlePasswordSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
                <CardDescription>更新登录密码。请使用至少 6 个字符的新密码。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new_password">新密码</Label>
                  <Input id="new_password" name="new_password" type="password" autoComplete="new-password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">确认新密码</Label>
                  <Input id="confirm_password" name="confirm_password" type="password" autoComplete="new-password" />
                </div>
                <FormSubmitButton className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  更新密码
                </FormSubmitButton>
              </CardContent>
            </Card>
          </form>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">危险区域</CardTitle>
              <CardDescription>不可逆的账户操作</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">删除账户</p>
                  <p className="text-sm text-muted-foreground">永久删除你的账户和所有数据</p>
                </div>
                <Button variant="destructive" disabled>删除账户</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

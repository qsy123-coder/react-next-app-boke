'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/server';
import { updateUserProfile } from '@/lib/supabase/profiles';
import type { ProfileUpdate } from '@/types';

function getStringValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

export async function updateProfileAction(formData: FormData) {
  const firstName = getStringValue(formData, 'first_name');
  
  const updates: ProfileUpdate = {
    first_name: firstName || null,
  };

  try {
    await updateUserProfile(updates);
    revalidatePath('/dashboard/account');
    return { success: true, message: '个人资料已更新' };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '更新失败' 
    };
  }
}

export async function updatePasswordAction(formData: FormData) {
  const newPassword = getStringValue(formData, 'new_password');
  const confirmPassword = getStringValue(formData, 'confirm_password');

  if (!newPassword || !confirmPassword) {
    return { success: false, message: '请填写新密码和确认密码' };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: '新密码与确认密码不匹配' };
  }

  if (newPassword.length < 6) {
    return { success: false, message: '新密码至少需要 6 个字符' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: '密码已更新' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '密码更新失败',
    };
  }
}

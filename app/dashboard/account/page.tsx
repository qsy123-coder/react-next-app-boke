import { redirect } from 'next/navigation';
import { getCurrentUserProfile } from '@/lib/supabase/profiles';
import { AccountClient } from './AccountClient';

export default async function AccountPage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect('/auth/login');
  }

  return <AccountClient profile={profile} />;
}

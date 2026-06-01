'use client';

import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useSignOut() {
  const router = useRouter();

  const handleSignout = async function logOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          toast.success('Logged out successfully');
        },
        onError: () => {
          toast.error('Failed to log out');
        },
      },
    });
  };

  return handleSignout;
}

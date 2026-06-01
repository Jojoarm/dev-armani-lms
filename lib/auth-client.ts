import { createAuthClient } from 'better-auth/react';
import { emailOTPClient } from 'better-auth/client/plugins';
import { adminClient } from 'better-auth/client/plugins';

export const { signIn, signUp, signOut, useSession, emailOtp } =
  createAuthClient({
    plugins: [emailOTPClient(), adminClient()],
  });

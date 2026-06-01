'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { emailOtp, signIn } from '@/lib/auth-client';
import { router } from 'better-auth/api';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { start } from 'repl';
import { toast } from 'sonner';

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState('');

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await signIn.social({
        provider: 'github',
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed in with Github, you will be redirected...');
          },
          onError: () => {
            toast.error('Failed to sign in with Github');
          },
        },
      });
    });
  }

  function signInWithEmail() {
    startEmailTransition(async () => {
      await emailOtp.sendVerificationOtp({
        email: email,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () => {
            toast.success('OTP sent to your email, please check your inbox');
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error('Failed to send OTP, please try again');
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>
          Please enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          className="w-full"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>Sign in with Github</>
          )}
        </Button>

        <div
          className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 
        after:flex after:items-center after:border-t after:border-border"
        >
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>Continue with Email</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

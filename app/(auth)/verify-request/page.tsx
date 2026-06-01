'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { emailOtp, signIn } from '@/lib/auth-client';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function VerifyRequest() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [emailPending, startEmailTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get('email') || '';
  const isOtpComplete = otp.length === 6;

  function verifyOtp() {
    startEmailTransition(async () => {
      await signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              'OTP verified successfully, you will be redirected to the homepage',
            );
            router.push('/');
          },
          onError: () => {
            toast.error('Failed to verify OTP, please try again');
          },
        },
      });
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sent a verification email code to your email address. Please
          open the email and paste the code below
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code from your email
          </p>
        </div>

        <Button
          onClick={verifyOtp}
          disabled={emailPending || !isOtpComplete}
          className="w-full"
        >
          {emailPending ? (
            <>
              <Loader className="size-4 animate-spin" />
            </>
          ) : (
            'Verify Account'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

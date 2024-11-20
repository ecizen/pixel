import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface User {
  id: string; // Adjust this according to your actual user structure
  name: string;
  email: string;
 
}

interface Session {
  user: User;
}

const SignInForm: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession() as { data: Session | null; status: string };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      router.push(`/`);
    }
  }, [status, session, router]);

  const handleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.ok) {
        // Sign-in was successful; handle additional logic if needed
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          Get Started
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In Now</DialogTitle>
            <DialogDescription className='text-xs'>
              Sign in to access your account, manage your preferences, and enjoy personalized features and content
            </DialogDescription>
            <div className='w-full'>
              <div className='mb-4'>
                <label className='text-sm text-black font-semibold'>Username</label>
                <Input placeholder='Username' className='mt-2' />
              </div>
              <div className='mb-4'>
                <label className='text-sm text-black font-semibold'>Password</label>
                <Input placeholder='Password' type='password' className='mt-2' />
              </div>
              <button className='w-full py-2 bg-blue-500 text-white rounded-md text-sm font-semibold' onClick={handleSignIn}>Sign In</button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SignInForm;
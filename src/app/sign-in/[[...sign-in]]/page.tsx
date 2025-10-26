// SignIn.tsx

import React from 'react';
import { useUser, useAuthenticatedUser, ClerkProvider } from '@clerk/clerk-react';

interface SignInProps {
  clerkApiKey: string;
}

const SignIn: React.FC<SignInProps> = ({ clerkApiKey }) => {
  const { isSignedIn, signIn, signUp } = useUser();
  const authenticatedUser = useAuthenticatedUser();

  if (authenticatedUser) {
    // Redirect to dashboard or homepage
    return <div>You are already signed in.</div>;
  }

  return (
    <div>
      <h1>Sign In</h1>
      {!isSignedIn && (
        <button onClick={() => signIn.start({ strategy: 'email_password' })}>
          Sign In
        </button>
      )}
      {!isSignedIn && (
        <button onClick={() => signUp.start({ strategy: 'email_password' })}>
          Sign Up
        </button>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const clerkApiKey = process.env.CLERK_API_KEY;

  if (!clerkApiKey) {
    throw new Error('Missing CLERK_API_KEY environment variable');
  }

  return (
    <ClerkProvider apiKey={clerkApiKey}>
      <SignIn clerkApiKey={clerkApiKey} />
    </ClerkProvider>
  );
};

export default App;
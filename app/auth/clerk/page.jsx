"use client";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useState } from "react";

const ClerkAuth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isSignIn ? "Sign in to your account" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to QuickCart
          </p>
        </div>

        <div className="mt-8">
          {isSignIn ? (
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: "bg-orange-600 hover:bg-orange-700",
                  card: "shadow-lg",
                },
              }}
            />
          ) : (
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: "bg-orange-600 hover:bg-orange-700",
                  card: "shadow-lg",
                },
              }}
            />
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-orange-600 hover:text-orange-500"
          >
            {isSignIn ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClerkAuth; 
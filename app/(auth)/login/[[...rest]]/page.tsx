'use client';
import { SignIn } from '@clerk/nextjs';


export default function LoginPage() {
return (
<div className="w-full max-w-md">
<div className="text-center mb-8">
<h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
<p className="mt-2 text-gray-600">Sign in to your Carshey account</p>
</div>


<SignIn
routing="path"
path="/login"
signUpUrl="/register"
afterSignInUrl="/"
redirectUrl="/"
appearance={{
elements: {
rootBox: 'mx-auto',
card: 'shadow-xl',
},
}}
/>
</div>
);
}
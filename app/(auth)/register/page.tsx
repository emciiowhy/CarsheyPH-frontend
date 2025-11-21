'use client';
import { SignUp } from '@clerk/nextjs';


export default function RegisterPage() {
return (
<div className="w-full max-w-md">
<div className="text-center mb-8">
<h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
<p className="mt-2 text-gray-600">Join Carshey in a few seconds</p>
</div>


<SignUp
routing="path"
path="/register"
signInUrl="/login"
afterSignUpUrl="/"
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
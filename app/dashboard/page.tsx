import { auth, currentUser } from "@clerk/nextjs/server";



export default async function DashboardPage() {
const user = await currentUser();


if (!user) {
// This server component will be shown only when user exists, but keep fallback guard if needed.
return <div>Redirecting...</div>;
}


return (
<div className="p-6">
<h1 className="text-2xl font-bold">Dashboard</h1>
<p className="mt-4">Welcome back, {user.firstName || user.emailAddresses?.[0]?.emailAddress}</p>
</div>
);
}
// ============================================
// frontend/app/(auth)/layout.tsx
// ============================================

export default function AuthLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="bg-background">
<div className="min-h-screen flex items-center justify-center p-6">
{children}
</div>
</body>
</html>
);
}

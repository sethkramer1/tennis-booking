import { AuthView } from "@neondatabase/neon-js/auth/react/ui";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <AuthView path={path} />
    </main>
  );
}

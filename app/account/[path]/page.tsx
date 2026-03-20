import { AccountView, accountViewPaths } from "@neondatabase/neon-js/auth/react/ui";

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  return (
    <main className="max-w-2xl mx-auto p-6">
      <AccountView path={path} />
    </main>
  );
}

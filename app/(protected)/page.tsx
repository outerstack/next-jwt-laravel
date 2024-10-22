// app/(protected)/page.tsx
import { getServerSideUser } from '@/lib/auth';

export default async function HomePage() {
  const user = await getServerSideUser();

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <p className="mt-4">This is your protected home page.</p>
    </div>
  );
}

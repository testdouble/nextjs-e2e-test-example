import { auth0 } from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Sign Up</a>
        <a href="/auth/login">Log In</a>
      </main>
    );
  }
  return (
    <main>
      <h1>Welcome, {session.user.name}</h1>
      <a href="/auth/logout">Log Out</a>
    </main>
  );
}

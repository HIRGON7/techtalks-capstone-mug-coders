import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>404 - Not Found</h1>
      <p>The page or resource you requested does not exist.</p>

      <Link href="/">
        Go Home
      </Link>
    </main>
  );
}
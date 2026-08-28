import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#050505] px-6 text-center text-[#F3F4F6]">
      <p className="font-mono text-sm uppercase tracking-widest text-[#00FFA2]">404</p>
      <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
      <p className="mt-4 max-w-md text-[#8B8B99]">The page you requested does not exist.</p>
      <Link href="/" className="mt-8 rounded bg-[#00FFA2] px-5 py-3 font-semibold text-[#050505]">
        Return home
      </Link>
    </main>
  );
}
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-[25vh]">
      <h1 className="fredoka font-semibold text-4xl mb-2">Page not found</h1>
      <p className="text-lg">
        This page, doesn&apos;t exist.{" "}
        <Link href="/" className="text-pink-600 font-medium hover:underline">
          Go home
        </Link>
        .
      </p>
    </div>
  );
}

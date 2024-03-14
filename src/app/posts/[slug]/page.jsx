import Link from "next/link";

export default async function Page({ params }) {
  return (
    <div>
      <h1>Page for {params.slug}</h1>
      <Link href="/">Home</Link>
    </div>
  );
}

import Link from "next/link";

export function BrandSection() {
  return (
    <div className="flex h-14  items-center border-b px-4">
      <Link href={"/"}>
        <span className="font-bold">Fortafolio WebKit</span>
      </Link>
    </div>
  );
}

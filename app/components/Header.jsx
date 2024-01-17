import Link from "next/link";
export default function Header() {
  return (
    <div className="navbar">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          WasmGen
        </Link>
      </div>
      {/* <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact us</Link>
          </li>
        </ul>
      </div> */}
    </div>
  );
}

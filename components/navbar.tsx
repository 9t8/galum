import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <ul>
        <li>
          <Link href="" className="contrast">
            Gunn Alumni
          </Link>
        </li>
        <li>
          <Link href="alums">List of Alumni</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="">Sign In</Link>
        </li>
        <li>
          <Link href="" role="button">
            Sign Up
          </Link>
        </li>
      </ul>
    </>
  );
}

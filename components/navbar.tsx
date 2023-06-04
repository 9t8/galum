import { SignedIn, SignedOut } from "@nhost/nextjs";

export default function Navbar() {
  return (
    <>
      <ul>
        <li>
          <a href="." className="contrast">
            Gunn Alumni
          </a>
        </li>
        <li>
          <a href="alums">List of Alumni</a>
        </li>
      </ul>
      <ul>
        <SignedOut>
          <li>
            <a href=".">Sign In</a>
          </li>
          <li>
            <a href="." role="button">
              Sign Up
            </a>
          </li>
        </SignedOut>
        <SignedIn>
          <li>
            <a href=".">My Profile</a>
          </li>
          <li>
            <a href=".">Sign Out</a>
          </li>
        </SignedIn>
      </ul>
    </>
  );
}

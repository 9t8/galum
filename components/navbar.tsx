import { SignedIn, SignedOut } from "@nhost/nextjs";

export default function Navbar() {
  return (
    <nav className="container">
      <ul>
        <li>
          <a href=".">
            <strong>Gunn Alumni</strong>
          </a>
        </li>
      </ul>
      <ul>
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
            <a href="sign-up" role="button">
              Sign Up
            </a>
          </li>
        </SignedOut>
        <SignedIn>
          <li>
            <a href="." role="button">
              My Profile
            </a>
          </li>
          <li>
            <a href=".">Sign Out</a>
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
}

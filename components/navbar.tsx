import { SignedIn, SignedOut, useSignOut } from "@nhost/nextjs";

export default function Navbar() {
  const { signOut } = useSignOut();

  return (
    <nav className="container">
      <ul>
        <li>
          <a href=".">Gunn Alumni</a>
        </li>
        <li>
          <a href="alums" className="secondary">
            List of Alumni
          </a>
        </li>
      </ul>
      <ul>
        <SignedOut>
          <li>
            <a href="sign-in">Sign In</a>
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
          <li onClick={signOut}>Sign Out</li>
        </SignedIn>
      </ul>
    </nav>
  );
}

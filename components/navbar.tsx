import { SignedIn, SignedOut, useSignOut, useUserId } from "@nhost/nextjs";

export default function Navbar() {
  const { signOut } = useSignOut();

  const id = useUserId();

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
        <SignedIn>
          <li>
            <a href={`profile?id=${id}`} role="button">
              My Profile
            </a>
          </li>
          <li>
            <a href="" onClick={signOut}>
              Sign Out
            </a>
          </li>
        </SignedIn>
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
      </ul>
    </nav>
  );
}

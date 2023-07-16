import { SignedIn, SignedOut, useSignOut, useUserId } from "@nhost/nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { signOut } = useSignOut();

  const router = useRouter();

  const id = useUserId();

  return (
    <nav className="container">
      <ul>
        <li>
          <a href=".">Gunn Alumni</a>
        </li>
        <li>
          <a href="alums" className="contrast">
            Alumni List
          </a>
        </li>
      </ul>
      <ul>
        <SignedIn>
          <li>
            <a href={`profile?id=${id}`}>My Profile</a>
          </li>
          <li>
            <a
              onClick={async (e) => {
                e.preventDefault();

                await signOut();
                router.push("");
              }}
              href=""
              className="secondary"
            >
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

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
        <li>
          <a href=".">Sign In</a>
        </li>
        <li>
          <a href="." role="button">
            Sign Up
          </a>
        </li>
      </ul>
    </>
  );
}

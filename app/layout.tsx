import Navbar from "@/components/Navbar";
import "@picocss/pico";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="container">
          <Navbar />
        </nav>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

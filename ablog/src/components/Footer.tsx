import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <Logo size="small" />
          <p>A modern blogging platform for sharing ideas.</p>
        </div>
        <div className="footer__links">
          <Link href="/">Home</Link>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Sign Up</Link>
        </div>
        <div className="footer__copy">
          &copy; {new Date().getFullYear()} ABlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

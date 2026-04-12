"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          <Logo />
        </Link>

        <button
          className={`header__hamburger ${menuOpen ? "header__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {user ? (
            <>
              <Link href="/blog/create" onClick={() => setMenuOpen(false)}>
                Write
              </Link>
              <Link href="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button onClick={handleLogout} className="header__logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/auth/register" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-purple-600">
          be-luma
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="hover:text-primary">
            Products & Services
          </Link>
          <Link href="#pricing" className="hover:text-primary">
            Pricing
          </Link>
          <Link href="#about" className="hover:text-primary">
            About
          </Link>
          <button className="btn btn-outline">Iniciar sesión</button>
          <button className="btn btn-primary">Crear cuenta</button>
        </nav>
      </div>
    </header>
  );
}

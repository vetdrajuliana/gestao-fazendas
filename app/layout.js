import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gestão de Fazendas",
  description: "Sistema de Gestão Agropecuária",
};

const cadastros = [
  { href: "/fazendas", label: "Fazendas" },
  { href: "/lotes", label: "Lotes/Piquetes" },
  { href: "/animais", label: "Animais" },
  { href: "/fornecedores", label: "Fornecedores" },
  { href: "/insumos", label: "Insumos" },
  { href: "/pessoas", label: "Pessoas" },
];

const linkClass =
  "text-green-900 hover:text-green-700 font-medium transition-all";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f7f2]`}
      >
        <header className="bg-white border-b border-green-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold text-green-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Gestão Agropecuária
            </Link>

            <nav className="flex items-center gap-8">
              <Link href="/" className={linkClass}>
                Início
              </Link>

              <div className="relative group">
                <button type="button" className={`${linkClass} py-2`}>
                  Cadastros
                </button>

                <div className="absolute left-0 top-full hidden pt-2 group-hover:block group-focus-within:block z-50">
                  <div className="bg-white shadow-lg rounded-2xl border border-green-100 min-w-[220px] overflow-hidden">
                    {cadastros.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-5 py-3 text-green-900 hover:bg-green-50 transition-all"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/rebanho" className={linkClass}>
                Rebanho
              </Link>

              <Link href="/nutricao" className={linkClass}>
                Nutrição
              </Link>

              <Link href="/financeiro" className={linkClass}>
                Financeiro
              </Link>

              <Link href="/relatorios" className={linkClass}>
                Relatórios
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}

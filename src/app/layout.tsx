import type { Metadata, Viewport } from "next";
import { Geist_Mono, M_PLUS_2 } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { aboutMe } from "@/data/aboutme";
import { SiteHeader } from "@/components/layout/site-header";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mPlus2 = M_PLUS_2({
  variable: "--font-m-plus-2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: aboutMe.name,
  description: aboutMe.description,
  icons: {
    icon: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mPlus2.variable} ${geistMono.variable} antialiased`}>
        <SiteHeader />
        <main className="pt-[5.5rem] md:pt-[6.5rem]">{children}</main>
        <footer className="border-t border-[color:var(--line-strong)] bg-[color:var(--page-bg)]">
          <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-5 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
            <div className="mb-4 text-sm text-slate-700">
              <p>
                © {new Date().getFullYear()} {aboutMe.name}.
              </p>
              {aboutMe.secretDescription && (
                <p className="mt-4 text-xs text-slate-600">
                  {aboutMe.secretDescription}
                </p>
              )}
            </div>
            <div className="mb-4">
              <p className="justify text-sm text-slate-600">
                Built with{" "}
                <a
                  href="https://github.com/tovacinni/research-website-template"
                  className="transition-colors hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
                >
                  research-website-template
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neatedge Cleaning",
  description: "Professional commercial cleaning services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

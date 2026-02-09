import "./globals.css";

export const metadata = {
  title: "Loom AI",
  description: "AI-powered fashion commerce",
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

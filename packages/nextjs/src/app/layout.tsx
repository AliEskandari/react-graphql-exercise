import QueryClientProvider from "@/components/wrappers/query-client-provider/query-client-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React Graphql Exercise",
  description: "React Graphql Exercise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import { Provider } from "@/components/ui/provider";
import { getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata(undefined, await getSettings());
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="pt-BR">
      <body>
        <Provider>
          <SiteHeader settings={settings} />
          <main>{children}</main>
          <SiteFooter settings={settings} />
        </Provider>
      </body>
    </html>
  );
}

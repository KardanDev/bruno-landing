import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site/chrome";
import { Provider } from "@/components/ui/provider";
import { getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";

import NavDock from "@/components/site/nav-dock";
import Script from "next/script";

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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PGCRJ4QC"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
        <Provider>
          <NavDock settings={settings} />
          <main>{children}</main>
          <SiteFooter settings={settings} />
        </Provider>

        <Script id="google-tag-manager" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PGCRJ4QC');
        `}</Script>
      </body>
    </html>
  );
}

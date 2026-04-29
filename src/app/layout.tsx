import type { Metadata } from "next";
import { Source_Code_Pro, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { DSPreviewBadge } from "@/components/DSPreviewBadge";
import "./globals.css";
import "./preview-ds.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const sourceCode = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Renner",
  description: "Real estate errands. Nearby Renners.",
};

// Synchronous reader for the design-system preview toggle. Reads the
// `ds` query param (?ds=v2 turns on, ?ds=off|v1 turns off) and a
// persistent `ds` cookie, then sets data-ds="v2" on <html> before
// first paint so preview-ds.css applies without flicker.
const DS_TOGGLE_SCRIPT = `(function(){try{
var qs=new URLSearchParams(window.location.search);
var ds=qs.get('ds');
var maxAge=60*60*24*30;
if(ds==='v2'){document.cookie='ds=v2; path=/; max-age='+maxAge;}
else if(ds==='off'||ds==='v1'){document.cookie='ds=; path=/; max-age=0';}
var m=document.cookie.match(/(?:^|; )ds=([^;]+)/);
var cur=(ds&&ds!=='off'&&ds!=='v1')?ds:(m?m[1]:'');
if(cur==='v2'){document.documentElement.setAttribute('data-ds','v2');}
else{document.documentElement.removeAttribute('data-ds');}
}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceSerif.variable} ${sourceCode.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: DS_TOGGLE_SCRIPT }} />
      </head>
      <body>
        {children}
        <DSPreviewBadge />
      </body>
    </html>
  );
}

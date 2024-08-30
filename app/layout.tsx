import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavbarMenuItem from "@/components/ui/NavbarMenuItem";
import Image from "next/image";

const inter = Mulish({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nithin's Blog",
  openGraph: {
    title: "Nithin's Blog",
    description: "The React Framework for the Web",
    url: "https://blog.nithinmonni.com/",
    siteName: "Nithin's Blog",
    images: [
      {
        url: "https://blog.nithinmonni.com/opengraph.png", // Must be an absolute URL
        width: 730,
        height: 260,
        alt: "My custom opengraph",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="m-auto max-w-[60rem] px-[2rem] py-3">
          <NavigationMenu className="max-w-full justify-between">
            <NavigationMenuList className="gap-3">
              <Image
                className="rounded-full"
                src={"/suit headshot.jpg"}
                alt="Profile"
                width={75}
                height={75}
              />
              <Image
                src={"/signature.png"}
                alt="Signature"
                width={100}
                height={100}
              />
            </NavigationMenuList>
            <NavigationMenuList>
              <NavbarMenuItem text="Dashboard" route="/" />
              <NavbarMenuItem text="Contact" route="/contact" />
            </NavigationMenuList>
          </NavigationMenu>
          {children}
        </section>
      </body>
    </html>
  );
}

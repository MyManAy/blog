import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export default function component({
  text,
  route,
}: {
  text: string;
  route: Url;
}) {
  return (
    <Link href={route} legacyBehavior passHref>
      <NavigationMenuItem
        className={
          "cursor-pointer block select-none space-y-2 rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-md font-black leading-none"
        }
      >
        <NavigationMenuLink>{text}</NavigationMenuLink>
      </NavigationMenuItem>
    </Link>
  );
}

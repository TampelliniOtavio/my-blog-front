import { useTranslations } from "@/i18n/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";
type Props = {
    url: URL;
    isAuthenticated: boolean;
};

export default function Navbar({ url, isAuthenticated }: Props) {
    const { t, lang } = useTranslations(url);

    return (
        <NavigationMenu className="hidden md:block -translate-x-1/2 left-1/2">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        href={`/${lang}`}
                        className={navigationMenuTriggerStyle()}
                    >
                        {t("navbar.home")}
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Conta</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 w-[200px]">
                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <NavigationMenuLink
                                            href={`/${lang}/profile`}
                                        >
                                            {t("navbar.account")}
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink
                                            href={`/${lang}/logout`}
                                        >
                                            {t("navbar.logout")}
                                        </NavigationMenuLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavigationMenuLink
                                            href={`/${lang}/login`}
                                        >
                                            {t("navbar.login")}
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink
                                            href={`/${lang}/signin`}
                                        >
                                            {t("navbar.signin")}
                                        </NavigationMenuLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

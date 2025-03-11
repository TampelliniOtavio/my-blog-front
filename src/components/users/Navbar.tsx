import type { IUser } from "@/lib/auth";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { useTranslations } from "@/i18n/utils";
import type { TranslationKeys } from "@/i18n/ui";

type Props = {
    user: IUser;
    url: URL;
};

interface Route {
    name: TranslationKeys;
    route: string;
}

function isRouteSelected(url: URL, route: string): boolean {
    return url.pathname === route;
}

export default function UserNavbar({ user, url }: Props) {
    const { lang, t } = useTranslations(url);
    const routes: Route[] = [
        {
            name: "navbar.users.posts",
            route: `/${lang}/users/${user.username}`,
        },
        {
            name: "navbar.users.likes",
            route: `/${lang}/users/${user.username}/likes`,
        },
    ];

    return (
        <NavigationMenu className="w-full">
            <NavigationMenuList className="flex justify-evenly">
                {routes.map((route) => (
                    <NavigationMenuItem key={route.name}>
                        <NavigationMenuLink
                            href={route.route}
                            className={navigationMenuTriggerStyle({
                                className: `${isRouteSelected(url, route.route) ? "border font-semibold" : ""}`,
                            })}
                        >
                            {t(route.name)}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

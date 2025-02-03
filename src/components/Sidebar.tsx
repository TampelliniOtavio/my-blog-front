import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useTranslations } from "@/i18n/utils";

type Props = {
    url: URL;
    isAuthenticated: boolean;
};

export default function Sidebar({ url, isAuthenticated }: Props) {
    const { t, lang } = useTranslations(url);

    return (
        <Sheet>
            <SheetTrigger asChild className="block md:hidden">
                <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent>
                <div className="flex flex-col">
                    <a href={`/${lang}`}>Home</a>
                    {isAuthenticated ? (
                        <>
                            <a href={`/${lang}/profile`}>Profile</a>
                            <a href={`/${lang}/logout`}>Log Out</a>
                        </>
                    ) : (
                        <>
                            <a href={`/${lang}/login`}>Log In</a>
                            <a href={`/${lang}/signin`}>Sign In</a>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}

import type { Auth, IAuth } from "@/lib/auth";
import { setAuthAtom } from "@/nanostores/auth";
import { useEffect } from "react";

type Props = {
    auth: IAuth | undefined;
};

export default function AtomSetters({ auth }: Props) {
    useEffect(() => {
        setAuthAtom(auth);
    }, []);
    return <></>;
}

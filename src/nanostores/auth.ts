import { Auth, type IAuth } from "@/lib/auth";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";

const authAtom = atom<Auth | undefined>(undefined);

export function getAuthAtom() {
    return useStore(authAtom);
}

export function setAuthAtom(auth: IAuth | undefined) {
    authAtom.set(auth ? new Auth(auth) : undefined);
}

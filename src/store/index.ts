import { atom } from "jotai"
import {IBug} from "@/types";

export const modalAtom = atom(false)
export const activeBugAtom = atom<IBug | null>(null)
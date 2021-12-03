import { FLAGS } from "../Constants/Flags";

export type AccessLevel = keyof typeof FLAGS;

export type AccessRules<Schema> = Record<keyof Schema, number>;
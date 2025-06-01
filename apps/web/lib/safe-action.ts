import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";


export const safeActionClient = createSafeActionClient();


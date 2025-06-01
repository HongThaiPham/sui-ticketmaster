"use server";

import { prisma, Event, Prisma } from "@repo/database";
import { safeActionClient } from "@/lib/safe-action";
import { CreatEventSchema } from "@/lib/validate-schema";
import { ActionResponse } from "@/types/ActionResponse.type";
import { cookies } from "next/headers";
import { returnValidationErrors } from "next-safe-action";
import { uploadImage } from "../upload-image";
import { z } from "zod";
import { getUnixTime } from "date-fns";

export const getEventByIdAction = safeActionClient
    .schema(
        z.object({
            id: z.string(),
        })
    )
    .action<ActionResponse<Event>>(async ({ parsedInput }) => {
        const { id } = parsedInput;
        const event = await prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            return {
                success: false,
                error: "Event not found",
            };
        }

        return {
            success: true,
            data: event,
        };
    });

export const createEventAction = safeActionClient
    .schema(CreatEventSchema)
    .action<ActionResponse<Event>>(async ({ parsedInput }) => {
        const {
            name,
            location,
            startAt, endAt,
            image,
            wallet, ticketPrice } = parsedInput;

        const cookieStore = await cookies();
        const idToken = cookieStore.get("privy-id-token")?.value;

        if (!idToken) {
            returnValidationErrors(CreatEventSchema, {
                _errors: ["Not authenticated"],
            });
            return {
                success: false,
                error: "Not authenticated",
            };
        }

        try {
            const files = image as File[];
            const imageUrls = await Promise.all(
                files.map(async (file) => {
                    const url = await uploadImage(file);
                    if (!url) {
                        throw new Error("Image upload failed");
                    }
                    return url;
                })
            );

            if (!imageUrls) {
                return {
                    success: false,
                    error: "Image upload failed",
                };
            }

            const event = await prisma.event.create({
                data: {

                    name,
                    location,
                    startAt: getUnixTime(startAt),
                    endAt: getUnixTime(endAt),
                    images: imageUrls,
                    creatorWallet: wallet,
                    ticket_price: ticketPrice,
                },
            });
            return {
                success: true,
                data: event,
            };
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    success: false,
                    error: e.message,
                };
            }
            return {
                success: false,
                error: "Unknown error",
            };
        }
    });
import { z } from "zod";
// import { zfd } from "zod-form-data";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
];

export const CreatEventSchema = z.object({
    wallet: z
        .string({ message: "Wallet address is required" }),
    name: z
        .string({ message: "Event name is required" })
        .min(1, "Event name is required")
        .max(100, "Event name must be less than 100 characters"),
    ticketPrice: z
        .coerce.number({ message: "Ticket price is required" })
        .min(0, "Ticket price must be a positive number"),
    location: z
        .string({ message: "Location is required" })
        .min(1, "Location is required")
        .max(200, "Location must be less than 200 characters"),
    timeRange: z
        .object({
            startAt: z.number().int().min(0),
            endAt: z.number().int().min(0),
        })
        .refine((data) => data.startAt < data.endAt, {
            message: "Start time must be before end time",
        }),
    image: z
        .any()
        .refine(
            (files) => files?.length >= 1 && files?.length <= 4,
            "Image is required."
        )
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 5MB.`
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
});
import { startOfDay } from "date-fns";
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
    startAt: z
        .date({
            required_error: "Start date is required",
        })
        .refine(
            (date) => {
                return date.getTime() > startOfDay(new Date()).getTime();
            },
            {
                message: "Start date must be in the future",
            }
        ),
    endAt: z.date({
        required_error: "End date is required",
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
    ticketAvailable: z
        .coerce.number({ message: "Ticket available is required" })
        .min(0, "Ticket available must be a positive number"),

});
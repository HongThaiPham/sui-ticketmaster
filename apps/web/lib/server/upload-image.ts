"use server";
const IMGBB_API_KEY = process.env.IMGBB_API_KEY as string;

export async function uploadImage(file: File): Promise<string | null> {
    try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("key", IMGBB_API_KEY);

        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Upload failed");
        }

        const data = await response.json();
        return data.data.url;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}
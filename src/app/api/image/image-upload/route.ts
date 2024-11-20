import { NextResponse } from "next/server";
import { getSession } from "next-auth/react"; // Use getSession from next-auth/react
import cloudinary from "@/lib/cloudinary";
import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Mendapatkan sesi pengguna dari NextAuth
    const session = await getSession({ req }); // Ambil session menggunakan getSession

    if (!session || !session.user?.id) {
      return res.status(401).json({ message: "You must be logged in to upload an image" });
    }

    // Parsing data dari request body
    const { title, category, description, image } = req.body;

    if (!category || !description || !image || !title) {
      return res.status(400).json({ message: "Title, description, image, and category are required" });
    }

    // Upload gambar ke Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'uploads', // Folder di Cloudinary
    });

    // Simpan informasi gambar beserta title, category, description, dan relasi dengan userId dari session
    const imageData = await db.image.create({
      data: {
        title,
        category,
        description,
        imageUrl: uploadResponse.secure_url, // URL gambar yang sudah di-upload
        publicId: uploadResponse.public_id, // Public ID untuk referensi di Cloudinary
        userId: session.user.id, // Menggunakan userId dari session
      },
    });

    return res.status(200).json(imageData);
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Error uploading image", error: error instanceof Error ? error.message : error });
  }
}

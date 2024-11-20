import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const user = await db.user.findMany();
        if (!user) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
    }
}

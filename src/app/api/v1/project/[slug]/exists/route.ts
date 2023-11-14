import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {NextRequestWithAuth} from "next-auth/middleware";

export async function GET(req: NextRequestWithAuth) {
    const session = await getToken({req});

    console.log(session)
    return NextResponse.json({
        success: true
    })
}
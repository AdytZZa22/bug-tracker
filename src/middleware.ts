import { withAuth } from "next-auth/middleware"
import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";


export default withAuth(
    async function middleware (req) {
        const session = await getToken({req})

        const url = req.nextUrl;
        //
        // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
        const hostname = req.headers
            .get("host")!

        // Get the pathname of the request (e.g. /, /about, /blog/first-post)
        const path = url.pathname;

        // if(req.nextUrl.pathname.startsWith("/project")) {
        //     const segments = req.nextUrl.pathname.split('/');
        //
        //     const slug = segments.length > 1 ? segments[2] : "";
        //
        //     const project = await prisma.project.findFirst({
        //         where: {
        //             slug: slug
        //         }
        //     });
        //
        //     if(!project) {
        //         return NextResponse.redirect(new URL('/', req.nextUrl));
        //     }
        // }

        if(req.nextUrl.pathname.startsWith('/api') && session === null) {
            return NextResponse.json({
                msg: "You are not allowed here. :)"
            }, {
                status: 403
            });
        }

        if(session && req.nextUrl.pathname.startsWith('/login')) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    },
    {
        callbacks: {
            authorized: async ({ req, token }) => {

                if(req.nextUrl.pathname.startsWith('/api') && token === null) {
                    return true;
                }

                return !(!req.nextUrl.pathname.startsWith('/login') &&
                    token === null);

            }
        }
    }
)
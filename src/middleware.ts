import { withAuth } from "next-auth/middleware"
import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";


export default withAuth(
    async function middleware (req) {
        const session = await getToken({req})

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
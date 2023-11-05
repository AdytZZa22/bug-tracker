import { withAuth } from "next-auth/middleware"
import {getToken} from "next-auth/jwt";
import {redirect} from "next/navigation";
import {NextResponse} from "next/server";


export default withAuth(
    async function middleware (req) {
        const session = await getToken({req})

        if(session && req.nextUrl.pathname.startsWith('/login')) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    },
    {
        callbacks: {
            authorized: async ({ req, token }) => {

                return !(!req.nextUrl.pathname.startsWith('/login') &&
                    token === null);

            }
        }
    }
)
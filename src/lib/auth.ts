import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    pages: {
        signIn: '/login'
    },
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({token, session}) {
            
            if(session.user) {
                session.user.id = Number(token.sub)
            }
            return session
        }
    }
}
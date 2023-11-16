import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import {Toaster} from "@/components/ui/toaster";
import Sidebar from '@/components/Sidebar';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {getUserProjects} from "@/modules/project/project.service";
import {Project} from "@prisma/client";

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })


export const metadata: Metadata = {
  title: 'Bug tracker',
  description: 'Bug tracker application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const session = await getServerSession(authOptions);
  let projects: Project[] = [];

  if(session) {
    projects  = await getUserProjects(session?.user.id as number)
  }

  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className={`${poppins.className}`}>
        <Toaster />
        <main className="flex">
          {session && <Sidebar projects={projects}/>}
          {children}
        </main>
      </body>
    </html>
  )
}

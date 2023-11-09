import Sidebar from "@/components/Sidebar";
import AddProject from "@/components/AddProject";
import Image from "next/image"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { BsFillBarChartFill } from "react-icons/bs";
import { createProject, getUserProjects } from "@/modules/project/project.service";
import { ProjectDTO } from "@/modules/project/project.schema";



export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {


    const session = await getServerSession(authOptions);
    const userProjects = await getUserProjects(session?.user.id as number)



  return (
    <main className="flex min-h-screen">
        <Sidebar projects={userProjects} />
        {/* Main content */}
        <div className="flex-1 px-4 pt-4">
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-4">

                <AddProject />
                {userProjects?.map((project) => {
                    return <div key={project.id} className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
                        <Image
                            className="rounded-lg"
                            src="https://app.vercel.pub/_next/image?url=https%3A%2F%2Fpublic.blob.vercel-storage.com%2FeEZHAoPTOBSYGBE3%2FhxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png&w=1080&q=75"
                            alt="Image"
                            width={500}
                            height={400}
                        />
                        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
                            <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
                                {project.name}
                            </h3>
                            <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
                                {project.description}
                            </p>
                        </div>
                        <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4">
                            <a
                                href={'#'}
                                target="_blank"
                                rel="noreferrer"
                                className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                            >
                                {`#`} ↗
                            </a>
                            <Link
                                href={`#`}
                                className="flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-200 dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400 dark:hover:bg-green-800 dark:hover:bg-opacity-50"
                            >
                                <BsFillBarChartFill />
                                <p>15%</p>
                            </Link>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </main>
  )
}

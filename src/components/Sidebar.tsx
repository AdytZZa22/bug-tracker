"use client"
import Image from "next/image";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { LuZap } from "react-icons/lu";
import { PiRocket, PiSignOutBold } from "react-icons/pi";
import { AiOutlineBug } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FiFile } from "react-icons/fi";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Badge} from "@/components/ui/badge";
import {SidebarItem} from "@/components/ui/sidebar-item";
import Link from "next/link";
import {Project} from "@prisma/client";
import {usePathname} from "next/navigation";
import {signOut} from "next-auth/react";



export default function Sidebar({projects}: {projects: Project[]}) {

    const pathname = usePathname();



    return <div className="flex-none flex-shrink-0 h-screen w-64 border-r-2 border-r-gray-200">
        <div className="flex justify-center pb-6">
            <Image src="/logo.png" width="150" height="150" alt="" />
        </div>

        <div className="flex-grow">

            <SidebarItem variant="default" href="/" active={pathname === "/"}>
                <HiOutlineViewGridAdd className="me-3" size={24} /><span className="text-[15px]">Overview</span>
            </SidebarItem>

            <SidebarItem size="none" asLink={false} >
                <div className="px-8">
                    <Accordion type="single"  defaultValue="item-1" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:no-underline font-normal">
                                <div className="flex items-center">
                                    <LuZap className="me-3" size={24} />
                                    <span className="text-[15px]">Projects</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="min-w-full border-l-gray-200 border-l-2 ms-2">
                                {projects?.map(project => {
                                    return <Link href={`/project/${project.slug}`} key={project.id} className={`flex gap-2 items-center p-2 ms-5 hover:bg-black hover:text-white ${pathname.includes(project.slug) ? 'bg-black text-white' : ''}`}>
                                        <FiFile size={14}/>
                                        <span className="text-[12px]">{project.name}</span>
                                    </Link>
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </SidebarItem>


            {pathname.includes("/project") && (
                <>
                    <SidebarItem>
                        <PiRocket className="me-3" size={24} /><span className="text-[15px]">Releases</span>
                    </SidebarItem>

                    <SidebarItem display="between">
                        <div className="flex items-center">
                            <AiOutlineBug className="me-3" size={24} />
                            <span className="text-[15px]">Reports</span>
                        </div>
                        <Badge variant="info">36</Badge>
                    </SidebarItem>

                    <SidebarItem display="between">
                        <div className="flex items-center">
                            <BsChatDots className="me-3" size={24} />
                            <span className="text-[15px]">Messages</span>
                        </div>
                        <Badge variant="info">9+</Badge>
                    </SidebarItem>

                    <SidebarItem>
                        <IoSettingsOutline className="me-3" size={24} /><span className="text-[15px]">Reports</span>
                    </SidebarItem>
                </>
            )}
        </div>

        <div className="py-10">
            <SidebarItem onClick={() => signOut()}>
                <PiSignOutBold className="me-3" size={24} /><span className="text-[15px]">Logout</span>
            </SidebarItem>
        </div>
    </div>
}
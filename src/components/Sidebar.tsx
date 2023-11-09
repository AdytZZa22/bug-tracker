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
import {signOut} from "next-auth/react";
import { Project } from "@prisma/client";



export default function Sidebar({projects}: {projects: Project[]}) {



    return <div className="flex flex-col w-64 h-screen border-r-2 border-r-gray-200">
        <div className="flex justify-center pb-6">
            <Image src="/logo.png" width="150" height="150" alt="" />
        </div>

        <div className="flex-grow">

            <div className="flex flex-col py-4 hover:bg-gray-100 cursor-pointer">
                <a href="#" className="flex items-center text-gray-400 border-r-4 border-r-black px-8">
                    <HiOutlineViewGridAdd className="me-3" size={24} /><span className="text-[15px]">Overview</span>
                </a>
            </div>

            <div className="flex flex-col hover:bg-gray-100 cursor-pointer">
                <div className="text-gray-400 px-8">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:no-underline font-normal">
                                <div className="flex items-center">
                                    <LuZap className="me-3" size={24} />
                                    <span className="text-[15px]">Projects</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="min-w-full border-l-gray-200 border-l-2 ms-2">
                                {projects.map(project => {
                                    return <div key={project.id} className="flex gap-2 items-center p-2 ms-5 hover:bg-black hover:text-white">
                                        <FiFile size={14}/>
                                        <span className="text-[12px]">{project.name}</span>
                                    </div>
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

            </div>

            <div className="flex flex-col py-4 hover:bg-gray-100 cursor-pointer">
                <a href="#" className="flex items-center text-gray-400 border-r-black px-8">
                    <PiRocket className="me-3" size={24} /><span className="text-[15px]">Releases</span>
                </a>
            </div>

            <div className="flex flex-col py-4 hover:bg-gray-100 cursor-pointer">
                <a href="#" className="flex items-center justify-between text-gray-400 border-r-black px-8">
                    <div className="flex items-center">
                        <AiOutlineBug className="me-3" size={24} />
                        <span className="text-[15px]">Reports</span>
                    </div>
                    <Badge variant="info">36</Badge>
                </a>
            </div>

            <div className="flex flex-col py-4 hover:bg-gray-100 cursor-pointer">
                <a href="#" className="flex items-center justify-between text-gray-400 border-r-black px-8">
                     <div className="flex items-center">
                         <BsChatDots className="me-3" size={24} />
                         <span className="text-[15px]">Messages</span>
                     </div>
                    <Badge variant="info">9+</Badge>
                </a>
            </div>

            <div className="flex flex-col py-4 hover:bg-gray-100 cursor-pointer">
                <a href="#" className="flex items-center text-gray-400 border-r-black px-8">
                    <IoSettingsOutline className="me-3" size={24} /><span className="text-[15px]">Reports</span>
                </a>
            </div>
        </div>


        <div className="py-10">
            <div className="flex flex-col py-4 hover:bg-gray-100 cursor-pointer">
                    <p onClick={() => signOut()} className="flex items-center text-gray-400 border-r-black px-8">
                        <PiSignOutBold className="me-3" size={24} /><span className="text-[15px]">Logout</span>
                    </p>
            </div>
        </div>
    </div>
}
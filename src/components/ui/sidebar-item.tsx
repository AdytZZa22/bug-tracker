"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority";
import {Slot} from "@radix-ui/react-slot";
import Link from "next/link";

const anchorItemVariants = cva(
    "",
    {
        variants: {
            display: {
                default: "justify-start",
                between: "justify-between",
                center: "justify-center",
                end: "justify-end",
            },
        },
        defaultVariants: {
            display: "default"
        }
    }
)
const sidebarItemVariants = cva(
    "flex flex-col cursor-pointer text-gray-400",
    {
        variants: {
            variant: {
                default: "hover:bg-gray-100"
            },
            size: {
                default: "py-4",
                none: ""
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)

export interface SidebarItemProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarItemVariants>,
    VariantProps<typeof anchorItemVariants>
{
    asChild?: boolean
    asLink?: boolean
    href?: string
    active?: boolean
}


const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
    ({className,variant, display, asChild, asLink = true, children, active, size, href = "",  ...props}, ref) => {
        const Comp = asChild ? Slot : "div"
        return <Comp
        className={cn(sidebarItemVariants({variant, size, className}))}
        {...props}
        ref={ref}
    >
            {
                asLink ? 
                <Link href={href} className={cn(anchorItemVariants({display}), `flex px-8 ${active ? 'border-r-black border-r-4' : ''}`)}>
                    {children}
                </Link> : children
            }
    </Comp>
})

SidebarItem.displayName = "SidebarItem"

export { SidebarItem }
import {Skeleton} from "@/components/ui/skeleton";
import {Separator} from "@/components/ui/separator";

export default function LoadingBoard() {
    return (
        <div className="flex items-center justify-center w-full">
            <div>
                <div className="flex p-4 justify-between space-x-20">
                    <div className="flex flex-col justify-between ">
                        <Skeleton className="h-4 mb-3 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="p-4 justify-between">
                    <div className="flex flex-grow flex-col">
                        <Skeleton className="h-4 mb-3 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <Skeleton className="h-6 w-6 mb-2 rounded-full mt-2"  />
                    <Separator/>
                </div>
                <div className="p-4 justify-between">
                    <div className="flex flex-grow flex-col">
                        <Skeleton className="h-4 mb-3 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <Skeleton className="h-6 w-6 mb-2 rounded-full mt-2"  />
                    <Separator/>
                </div>
            </div>
            <div>
                <div className="flex p-4 justify-between space-x-20">
                    <div className="flex flex-col justify-between ">
                        <Skeleton className="h-4 mb-3 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="p-4 justify-between">
                    <div className="flex flex-grow flex-col">
                        <Skeleton className="h-4 mb-3 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <Skeleton className="h-6 w-6 mb-2 rounded-full mt-2"  />
                    <Separator/>
                </div>
                <div className="p-4 justify-between">
                    <div className="flex flex-grow flex-col">
                        <Skeleton className="h-4 mb-3 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <Skeleton className="h-6 w-6 mb-2 rounded-full mt-2"  />
                    <Separator/>
                </div>
            </div>
            <div>
                <div className="flex p-4 justify-between space-x-20">
                    <div className="flex flex-col justify-between ">
                        <Skeleton className="h-4 mb-3 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="p-4 justify-between">
                    <div className="flex flex-grow flex-col">
                        <Skeleton className="h-4 mb-3 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <Skeleton className="h-6 w-6 mb-2 rounded-full mt-2"  />
                    <Separator/>
                </div>
                <div className="p-4 justify-between">
                    <div className="flex flex-grow flex-col">
                        <Skeleton className="h-4 mb-3 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <Skeleton className="h-6 w-6 mb-2 rounded-full mt-2"  />
                    <Separator/>
                </div>
            </div>
        </div>
    )
}
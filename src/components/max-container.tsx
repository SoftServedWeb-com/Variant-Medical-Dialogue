import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function Container({ children, className, ...args }: ComponentProps<"div">) {
    return (
        <div className={cn('w-full flex justify-center px-4 py-4', className)} {...args}>
            <div className={cn('md:max-w-[1248px] md:mx-auto w-full ')}>
                {children}
            </div>
        </div>
    );
}
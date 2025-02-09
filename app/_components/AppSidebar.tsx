import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Calendar, CircleDollarSignIcon, Highlighter, Home, Inbox, Search, Settings } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "WorkSpace",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Design",
    url: "design",
    icon: Highlighter,
  },
  {
    title: "Credits",
    url: "/credits",
    icon: CircleDollarSignIcon,
  },
];

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <Image src={"./logo.svg"} alt="logo" width={50} height={50} className="w-[300px] h-[50px]" />
          <h2 className=" mt-3 text-sm text-gray-400 text-center">Build Awesome</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title} className="p-1">
                  <SidebarMenuButton asChild className="">
                    <a
                      href={item.url}
                      key={index}
                      className={`p-1 text-lg flex gap-1 items-center
                                        hover:bg-gray-100 rounded-lg 
                                        ${path == item.url && "bg-gray-300"}`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <h2 className="p-2 text-gray-400 text-sm text-center">With Love</h2>
      </SidebarFooter>
    </Sidebar>
  );
}

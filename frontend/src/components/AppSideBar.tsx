import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ArrowUpCircleIcon, ChevronDown } from "lucide-react";
import { items } from "@/utils/menu";

import AppSideBarFooter, { AppSideBarFooterProps } from "./AppSideBarFooter";
import AppSideBarHeader from "./AppSideBarHeader";

export default function AppSideBar() {
  const userSession: AppSideBarFooterProps["userSession"] = {
    name: "Marcos Enrique",
    email: "marcos@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <AppSideBarHeader
        iconLogo={<ArrowUpCircleIcon className="h-5 w-5" />}
        title="Todo Cuenta"
        to="/dashboard"
      />

      <SidebarContent>
        {items.groups.map((group) =>
          group.subtItems && group.subtItems.length > 0 ? (
            <Collapsible
              key={group.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex items-center cursor-pointer">
                    {group.label}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.subtItems.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton tooltip={subItem.title}>
                            {subItem.icon && (
                              <subItem.icon className="w-4 h-4" />
                            )}
                            <span>{subItem.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={group.title}>
                      {group.icon && <group.icon className="w-4 h-4" />}
                      <span>{group.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        )}
      </SidebarContent>

      <AppSideBarFooter userSession={userSession} />
    </Sidebar>
  );
}

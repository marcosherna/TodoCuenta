import React from "react";
import { Link } from "react-router";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";

export interface AppSideBarHeaderProps {
  iconLogo?: React.ReactNode;
  title?: string;
  to: string;
}

export default function AppSideBarHeader({
  iconLogo,
  title,
  to,
}: AppSideBarHeaderProps) {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <Link to={to}>
              {iconLogo}
              <span className="text-base font-semibold">{title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

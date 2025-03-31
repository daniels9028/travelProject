import * as React from "react";

import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logo } from "@/assets/images";
import {
  House,
  Images,
  Users,
  BadgePercent,
  LayoutList,
  SquareActivity,
  ShoppingCart,
} from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { loggedUser } = useSelector((state: RootState) => state.user);

  const data = {
    user: {
      name: loggedUser?.name ?? "User",
      email: loggedUser?.email ?? "user@gmail.com",
      avatar: loggedUser?.profilePictureUrl ?? "/avatars/shadcn.jpg",
    },
    navSecondary: [
      {
        title: "Dashboard",
        url: "dashboard",
        icon: House,
      },
      {
        title: "User",
        url: "dashboard/users",
        icon: Users,
      },
      {
        title: "Banner",
        url: "dashboard/banners",
        icon: Images,
      },
      {
        title: "Promo",
        url: "dashboard/promos",
        icon: BadgePercent,
      },
      {
        title: "Category",
        url: "dashboard/categories",
        icon: LayoutList,
      },
      {
        title: "Activity",
        url: "dashboard/activities",
        icon: SquareActivity,
      },
      {
        title: "Transaction",
        url: "dashboard/transactions",
        icon: ShoppingCart,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src={logo} alt="logo" className="w-8 h-8" />
                <span className="text-base font-semibold">Travel</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

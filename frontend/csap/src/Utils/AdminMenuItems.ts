import { ManageHistory, SvgIconComponent } from "@mui/icons-material";

export type MenuItems = {
  title: string;
  icon: SvgIconComponent;
  path: string;
};

export const AdminMenuItems = [
  {
    title: "Dashboard",
    icon: ManageHistory,
    path: "/admin",
  },
  {
    title: "Courses",
    icon: ManageHistory,
    path: "/admin/courses",
  },
  {
    title: "Challenges",
    icon: ManageHistory,
    path: "/admin/challenges",
  },
  {
    title: "Manage User",
    icon: ManageHistory,
    path: "/manage-courses",
  },
  {
    title: "Manage Courses",
    icon: ManageHistory,
    path: "/manage-courses",
  },
];

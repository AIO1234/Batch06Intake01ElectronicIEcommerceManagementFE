// Home & Dashboard Route Configuration
// Loads the default admin layout (SideBar + HorizantalBar) and renders the Dashboard view
export default [
  {
    path: "/",
    redirect: "/admin/dashboard",
  },
  {
    path: "/admin",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "/admin/dashboard",
        component: () => import("@/views/AdminSide/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
        },
      },
    ],
  },
];

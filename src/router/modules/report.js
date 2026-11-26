// Default Business Reports Route Configuration (Shared across all team members)
// Loads the ReportingModule view inside the default admin layout
export default [
  {
    path: "/admin",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "/admin/reports",
        component: () => import("@/views/ReportingModule/index.vue"),
        meta: {
          pageTitle: "Business Reports",
        },
      },
    ],
  },
];

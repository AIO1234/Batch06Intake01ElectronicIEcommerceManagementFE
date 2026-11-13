export default [
  {
    path: "/admin",
    component: import("@/layouts/default.vue"),
    children: [
      {
        path: "/admin/users",
        component: import("@/views/AdminSide/UserManagement/index.vue"),
        meta: {
          pageTitle: "User Management",
        },
      },
    ],
  },
];

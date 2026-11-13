export default [
  {
    path: "/admin",
    component: import("@/layouts/default.vue"),
    children: [
      {
        path: "/admin/dashboard",
        // component : import("..pages/index.vue")
        component: import("@/views/AdminSide/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
        },
      },
    ],
  },
];

// Inventory Management Route Configuration (Dinitha's Module)
// Loads the Inventory Management page inside the default admin layout
export default [
  {
    path: "/admin",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "/admin/inventory",
        component: () => import("@/views/InventoryModule/index.vue"),
        meta: {
          pageTitle: "Inventory Management",
        },
      },
    ],
  },
];

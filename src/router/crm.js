const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/view/layout/Layout"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/view/pages/Dashboard.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/transfer/order",
        name: "transferOrder",
        component: () => import("@/view/pages/transferOrder.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/users",
        name: "user_list",
        component: () => import("@/view/pages/user/user.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/customers",
        name: "customer_list",
        component: () => import("@/view/pages/customer/customer.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/shops",
        name: "shop_list",
        component: () => import("@/view/pages/shop/store.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/shops/:id",
        name: "shop_detail",
        component: () => import("@/view/pages/shop/pages/store-detail.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/shops/:id/edit",
        name: "shop_edit",
        component: () => import("@/view/pages/shop/pages/store-edit.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/shops/create",
        name: "store_create",
        component: () => import("@/view/pages/shop/pages/store-create"),
        meta: { requiresAuth: true }
      },
      {
        path: "/shops/test",
        name: "store_test",
        component: () => import("@/view/pages/shop/pages/store-test"),
        meta: { requiresAuth: true }
      },
      {
        path: "/users/:id",
        name: "user_profile",
        component: () => import("@/view/pages/user/profile/user-profile.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/items",
        name: "item_list",
        component: () => import("@/view/pages/item/item"),
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: "/",
    component: () => import("@/view/pages/auth/Auth"),
    children: [
      {
        name: "login",
        path: "/login",
        component: () => import("@/view/pages/auth/Login")
      }
    ]
  }
];

export default routes;

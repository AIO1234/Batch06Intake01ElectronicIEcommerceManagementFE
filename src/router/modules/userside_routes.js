import Home from "@/views/UserSide/Home.vue";
import Events from "@/views/UserSide/Events.vue";
import Profile from "@/views/UserSide/Profile.vue";
import Signin from "@/views/UserSide/Signin.vue";
import Loginform from "@/views/UserSide/Loginform.vue";

export default [
  {
    path: "/",
    component: import("@/layouts/user.vue"),
    children: [
      // home
      { path: "/home", name: "home", component: Home },
      //   events
      { path: "/Events", name: "events", component: Events },
      //   profile
      { path: "/Profile", name: "profile", component: Profile },
      //   signin
      { path: "/Signin", name: "signin", component: Signin },
      //   login form
      {
        path: "/Loginform",
        name: "login",
        component: Loginform,
      },
    ],
  },
];

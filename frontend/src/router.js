import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/auth/Login";
import Auth from "@/components/auth/Auth";
import store from "./store";

const rejectAuthUser = (to, from, next) => {
  if (store.state.auth.token) {
    next({ name: "home" });
  } else {
    next();
  }
};

const onlyAuthUser = async (to, from, next) => {
  if (!store.state.auth.token) {
    next({ name: "login" });
  } else {
    await store.dispatch("notepads/getNotepad");
    await store.dispatch("auth/getUserInfo");
    next();
  }
};
Vue.use(VueRouter);
const SignUp = () => import("@/components/auth/SignUp");
const Home = () => import("@/components/Home");
const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home, name: "home", beforeEnter: onlyAuthUser },
    {
      path: "/auth",
      component: Auth,
      name: "auth",
      children: [
        {
          path: "login",
          component: Login,
          name: "login",
          beforeEnter: rejectAuthUser,
        },
        {
          path: "sign-up",
          component: SignUp,
          name: "signup",
          beforeEnter: rejectAuthUser,
        },
      ],
    },
  ],
});

export default router;

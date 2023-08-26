import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/clients/supabase";
import { useUserStore } from "@/stores/useUserStore";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/secret",
      name: "secret",
      component: () => import("@/views/SecretView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  let { data } = await supabase.auth.getSession();

  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  const userStore = useUserStore();
  if (data.session) {
    userStore.user = data.session.user;
  }

  if (to.meta.requiresAuth && !data.session) {
    next({ path: "/login" });
  } else if (requiresGuest && data.session) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;

import { Router, Polymer } from "@vaadin/router";

const outlet = document.getElementById("outlet");
export const router = new Router(outlet);

router.setRoutes([
  {
    path: "/",
    component: 'main-layout',
    animate: {
      enter: "primary-layout-entering",
      leave: "primary-layout-leaving",
    },
    children: [
      {
        path: "/",
        component: "welcome-page",
      },
      {
        path: "/main-page",
        component: "main-page",
      },
    ],
  },
]);
/*
router.setRoutes([
  {
    path: "/",
    component: "full-screen-layout",
    animate: {
      enter: "primary-layout-entering",
      leave: "primary-layout-leaving",
    },
    children: [
      {
        path: "/",
        component: "welcome-page",
        animate: true,
      },
      
    ],
  },
  {
    path: "/main-page",
    component: "main-layout",
    animate: {
      enter: "primary-layout-entering",
      leave: "primary-layout-leaving",
    },
    children: [
      {path: "/main-page", component: "main-page"}
    ]
  },
  { path: "(.*)", redirect: "/main-page" },
]);
*/
/*
router.setRoutes([
  {
    path: "/",
    component: 'full-screen-layout',
    
    children: [
      {
        path: "/",
        component: "welcome-page",
        animate: {
          enter: "primary-layout-entering",
          leave: "primary-layout-leaving",
        },
        children: {
          path: "/main-page",
          component: 'main-layout',
          children: [
            {path: '/main-page', component: ''}
          ]
        }
      },

      
    ],
  },
]);
*/
/*router.setRoutes([
  {
    path: "/",
    component: "x-wrapper",
    children: [
      {
        path: "/users",
        animate: {
          enter: "users-entering",
          leave: "users-leaving",
        },
        children: [
          { path: "", component: "x-user-list" },
          {
            path: "/:user",
            component: "x-user-profile",
            animate: true,
          },
        ],
      },
      { path: "(.*)", redirect: "/users" },
    ],
  },
]);*/

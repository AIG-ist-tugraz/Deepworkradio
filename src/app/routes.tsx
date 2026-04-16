import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/landing";
import { Onboarding } from "./pages/onboarding";
import { Player } from "./pages/player";
import { History } from "./pages/history";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/onboard",
    Component: Onboarding,
  },
  {
    path: "/player",
    Component: Player,
  },
  {
    path: "/history",
    Component: History,
  },
]);
import {AUTH_ROUTE, HISTORY_ROUTE, HOME_ROUTE, NOT_FOUND} from "./utils/consts";
import Auth from "./pages/Auth";
import Home from "./pages/Projects";
import NotFound from "./pages/NotFound";

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    },

    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: NOT_FOUND,
        Component: NotFound
    }
]
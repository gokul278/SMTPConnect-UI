import React from "react";
import {
    Navigate,
    // Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import RoleProtectedRoute from "./RoleProtectedRoute";
import ScrollToTop from "../../lib/ScrollToTop";
import { AuthProvider } from "./AuthContent";
import LadingPage from "../LandingPage/LadingPage";
import ComingSoon from "../LandingPage/ComingSoon";

export interface AppRoute {
    path?: string; // Made path optional
    element: React.ReactNode;
    index?: boolean;
    children?: AppRoute[];
    allowedRoles?: string[]; // Only for RoleProtectedRoute
    redirectTo?: string; // For Navigate component
}

interface MainRoutesProps { }

const MainRoutes: React.FC<MainRoutesProps> = () => {
    // const adminRoutes: AppRoute[] = [
    //     { index: true, element: <Navigate to="register" replace /> },
    //     { path: "register", element: <RegisterStudent /> },
    //     // { path: "mail", element: <AdminMail /> },
    // ];

    const renderRoutes = (routes: AppRoute[]) => {
        return routes.map((route, index) => {
            const Element = route.element;
            if (route.allowedRoles) {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <RoleProtectedRoute allowedRoles={route.allowedRoles}>
                                {Element}
                            </RoleProtectedRoute>
                        }
                    >
                        {route.children && renderRoutes(route.children)}
                    </Route>
                );
            } else if (route.redirectTo) {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={<Navigate to={route.redirectTo} replace />}
                    />
                );
            } else if (route.children) {
                return (
                    <Route key={index} path={route.path} element={Element}>
                        {renderRoutes(route.children)}
                    </Route>
                );
            }
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={Element}
                    index={route.index}
                />
            );
        });
    };

    return (
        <Router>
            <ScrollToTop />
            <AuthProvider>
                <Routes>
                    <Route index element={<LadingPage />} />
                    <Route path="/commingsoon" index element={<ComingSoon />} />
                    {/* <Route path="/unauthorized" index element={<Unauthorized />} />

          <Route
            path="/admin"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <MasterHeader />
              </RoleProtectedRoute>
            }
          >
            {renderRoutes(adminRoutes)}
          </Route> */}
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default MainRoutes;
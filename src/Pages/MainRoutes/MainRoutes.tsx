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
import Signin from "../Signin/Signin";
import Signup from "../Singup/Signup";
import DashboardPage from "../DashboardPage/DashboardPage";
import MasterHeader from "../MasterHeader/MasterHeader";
import SendMailHistoryPage from "../SendMailHistoryPage/SendMailHistoryPage";
import ConfigurationPage from "../ConfigurationPage/ConfigurationPage";
import SendMailPage from "../SendMailPage/SendMailPage";

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
    const userRoutes: AppRoute[] = [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: "dashboard", element: <DashboardPage /> },
        { path: "configuration", element: <ConfigurationPage /> },
        { path: "send-mail", element: <SendMailPage /> },
        { path: "mail-history", element: <SendMailHistoryPage /> },
    ];

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
                    <Route path="/signin" index element={<Signin />} />
                    <Route path="/signup" index element={<Signup />} />
                    {/* <Route path="/unauthorized" index element={<Unauthorized />} /> */}

                    <Route
                        path="/user"
                        element={
                            <RoleProtectedRoute allowedRoles={["user"]}>
                                <MasterHeader />
                            </RoleProtectedRoute>
                        }
                    >
                        {renderRoutes(userRoutes)}
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default MainRoutes;
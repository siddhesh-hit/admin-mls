import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { routes } from "./routes";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../components/login/Login";
import ForgetPassword from "../components/login/Forgetpassword";
import ResetPassword from "../components/login/ResetPass";

import Header from "../components/common/Header";
import Menu from "../components/common/Menu";
import Footer from "../components/common/Footer";
import Captcha from "../components/common/Captcha";

const Layout = ({ children }) => {
  const location = useLocation();
  const noHeaderFooterPaths = [
    "/",
    "/Captcha",
    "/Forgetpassword",
    "/ResetPassword",
  ];

  const showHeaderFooter = !noHeaderFooterPaths.includes(
    location.pathname.toLowerCase()
  );
  return (
    <>
      {showHeaderFooter && <Header />}
      {showHeaderFooter && <Menu />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default function RoutesData() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Captcha" element={<Captcha />} />

            {/* <Header />
          <Menu /> */}
            <Route path="/Forgetpassword" element={<ForgetPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute element={route} />}
              />
            ))}
            {/* <Footer /> */}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

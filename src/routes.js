import { Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./views/Home";
import Products from "@views/Products";
import ProductDetails from "@views/Products/ProductDetails";
import AboutUs from "@views/AboutUs";
import Contact from "@views/Contact";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "product/details", element: <ProductDetails /> },
      { path: "our-story", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "/", element: <Navigate to="/" /> },
    ],
  },
];

export default routes;

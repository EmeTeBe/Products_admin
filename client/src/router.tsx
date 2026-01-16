import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader } from "./pages/Products";
import NewProduct, { action as productAction } from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Products, loader: productsLoader },
      { path: "new-product", Component: NewProduct, action: productAction },
      { path: "/products/:id/edit", Component: EditProduct },
    ],
  },
]);

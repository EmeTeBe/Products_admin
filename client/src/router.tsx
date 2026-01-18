import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as productsLoader,
  action as updateAction,
} from "./pages/Products";
import NewProduct, { action as productAction } from "./pages/NewProduct";
import EditProduct, {
  loader as editLoader,
  action as editAction,
} from "./pages/EditProduct";
import { action as deleteAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Products,
        loader: productsLoader,
        action: updateAction,
      },
      { path: "new-product", Component: NewProduct, action: productAction },
      {
        path: "/products/:id/edit",
        Component: EditProduct,
        loader: editLoader,
        action: editAction,
      },
      {
        path: "/products/:id/delete",
        action: deleteAction,
      },
    ],
  },
]);

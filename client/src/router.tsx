import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layouts/Layout";
import {
  loader as productsLoader,
  action as updateAction,
} from "./pages/Products";
import { action as productAction } from "./pages/NewProduct";
import {
  loader as editLoader,
  action as editAction,
} from "./pages/EditProduct";
import { action as deleteAction } from "./components/ProductDetails";
import LoadingSpinner from "./components/LoadingSpinner";

const Products = lazy(() => import("./pages/Products"));
const NewProduct = lazy(() => import("./pages/NewProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    hydrateFallbackElement: (
      <LoadingSpinner message="Cargando productos" fullScreen />
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Products />
          </Suspense>
        ),
        loader: productsLoader,
        action: updateAction,
      },
      {
        path: "/new-product",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NewProduct />
          </Suspense>
        ),
        action: productAction,
      },
      {
        path: "/products/:id/edit",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EditProduct />
          </Suspense>
        ),
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

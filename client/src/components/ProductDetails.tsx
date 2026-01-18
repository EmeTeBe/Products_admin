import {
  Form,
  useNavigate,
  type ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  await deleteProduct(Number(params.id));
  return redirect("/");
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const isAvailable = product.availability;
  const navigate = useNavigate();
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvailable ? "text-black" : "text-red-500"} cursor-pointer rounded-md p-2 text-sm font-bold shadow-md uppercase w-full hover:bg-gray-200`}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            className="cursor-pointer rounded-md bg-indigo-600 p-2 text-sm font-bold text-white shadow-md uppercase hover:bg-indigo-500 w-full"
            onClick={() =>
              navigate(`/products/${product.id}/edit`, {
                state: { product: product },
              })
            }
          >
            Editar
          </button>
          <Form
            method="POST"
            action={`/products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm("¿Deseas eliminar este producto?")) {
                e.preventDefault();
              }
            }}
            className="w-full"
          >
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-indigo-600 p-2 text-sm font-bold text-white shadow-md uppercase hover:bg-red-500 w-full"
            >
              Eliminar
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
}

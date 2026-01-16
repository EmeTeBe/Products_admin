import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const isAvailable = product.availability;
  const navigate = useNavigate();
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {isAvailable ? "Disponible" : "No Disponible"}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            className="cursor-pointer rounded-md bg-indigo-600 p-2 text-sm font-bold text-white shadow-md uppercase hover:bg-indigo-500"
            onClick={() =>
              navigate(`/products/${product.id}/edit`, {
                state: { product: product },
              })
            }
          >
            Editar
          </button>
          <button className="cursor-pointer rounded-md bg-indigo-600 p-2 text-sm font-bold text-white shadow-md uppercase hover:bg-red-500">
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

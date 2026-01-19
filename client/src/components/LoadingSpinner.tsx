// components/LoadingSpinner.tsx
import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  delay?: number; // para evitar flash en cargas rápidas
}

export default function LoadingSpinner({
  message = "Cargando...",
  fullScreen = false,
  delay = 200,
}: LoadingSpinnerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div
      className={`flex flex-col items-center justify-center ${fullScreen ? "min-h-screen" : "min-h-75"}`}
    >
      <div className="relative">
        {/* Spinner con gradiente */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-indigo-600 border-r-indigo-500 border-b-indigo-400"></div>

        {/* Centro del spinner */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-6 w-6 bg-indigo-100 rounded-full"></div>
        </div>
      </div>

      {/* Mensaje con animación suave */}
      <p className="mt-4 text-gray-600 font-medium animate-pulse">{message}</p>

      {/* Texto de ayuda (opcional) */}
      <p className="mt-2 text-sm text-gray-400">
        Esto puede tomar unos segundos...
      </p>
    </div>
  );
}

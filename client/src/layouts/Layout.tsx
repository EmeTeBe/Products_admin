import { Outlet, Link, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  
  // Verificar ruta activa para estilos
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-linear-to-r from-slate-800 to-slate-900 shadow-lg">
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Logo/Título */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Administrador de Productos
              </h1>
              <p className="text-slate-300 text-sm mt-1 hidden sm:block">
                Gestión completa de inventario
              </p>
            </div>
            
            {/* Mobile */}
            <nav className="sm:hidden w-full">
              <div className="flex justify-around bg-slate-700/50 rounded-lg p-2">
                <Link 
                  to="/" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive("/") ? "bg-slate-600 text-white" : "text-slate-300 hover:text-white"}`}
                >
                  Productos
                </Link>
                <Link 
                  to="/new-product" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive("/new-product") ? "bg-slate-600 text-white" : "text-slate-300 hover:text-white"}`}
                >
                  Nuevo
                </Link>
              </div>
            </nav>
            
            {/* Desktop */}
            <nav className="hidden sm:flex space-x-2">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/") ? "bg-white text-slate-900" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`}
              >
                <div className="flex items-center">
                  Productos
                </div>
              </Link>
              <Link 
                to="/new-product" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/new-product") ? "bg-white text-slate-900" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`}
              >
                <div className="flex items-center">
                  Nuevo Producto
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8 md:py-10">
        <div className="bg-white rounded-xl shadow-sm sm:shadow-md overflow-hidden  h-full max-h-[calc(100vh-16rem)] flex flex-col">
          <div className="flex-1 overflow-auto p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="shrink-0 bg-white/50 border-t">
        <div className="mx-auto px-4 py-3 sm:py-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} - Administrador de Productos
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-slate-800 text-sm">
                Términos
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-800 text-sm">
                Privacidad
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-800 text-sm">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
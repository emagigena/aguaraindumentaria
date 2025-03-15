import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-white font-bold text-xl">Aguara Indumentaria</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/products">
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productos</span>
              </Link>
              <Link href="/about">
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contáctanos</span>
              </Link>
              {/* Agrega más enlaces según tus necesidades */}
            </div>
          </div>
        </div>
      </div>

      {/* Agrega aquí el menú desplegable para la versión móvil */}
      {/* Puedes usar Tailwind CSS para estilos personalizados */}
    </nav>
  );
};

export default NavBar;

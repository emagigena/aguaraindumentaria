// Footer.tsx

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contacto</h2>
            <ul>
              <li className="mb-2">
                <span className="font-semibold">Teléfono:</span> +54 9 3404 59-7724
              </li>
              <li className="mb-2">
                <span className="font-semibold">Email:</span> airelibrescc@gmail.com
              </li>
              <li className="mb-2">
                <span className="font-semibold">WhatsApp:</span> +54 9 3404 59-7724
              </li>
            </ul>
          </div>

          {/* Address Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Dirección</h2>
            <p>
              Colón 360, <br />
              San Carlos Centro, Santa Fe, <br />
              Argentina.
            </p>
          </div>

          {/* Hours Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Horarios</h2>
            <ul>
              <li className="mb-2">Lunes a Viernes: 9:00 AM - 5:00 PM</li>
              <li className="mb-2">Sábados y Domingos: Cerrado</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Aguará Indumentaria. Todos los derechos reservados.</p>
          <div className="mt-4">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">
              Política de Privacidad
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-white">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

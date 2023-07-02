import Header from "@/components/header/Header";
import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavBar />
          <Header/>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        

        <section className="grid grid-cols-1 gap-8 max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Producto 1 */}
          <div className="bg-white rounded-lg shadow-md">
            <Image
              src={"https://res.cloudinary.com/dhrfu31jp/image/upload/v1688332349/lasetubal/home/reels_xifved.jpg"}
              alt="Producto 1"
              width={670}
              height={500}
              className="rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Producto 1</h2>
              <p className="text-gray-600">
                Descripción del producto 1. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Agregar al carrito
              </button>
            </div>
          </div>

          {/* Producto 2 */}
          <div className="bg-white rounded-lg shadow-md">
            <Image
              src={"https://res.cloudinary.com/dhrfu31jp/image/upload/v1688332348/lasetubal/home/camping_d6hq1k.jpg"}
              alt="Producto 2"
              width={670}
              height={300}
              className="rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Producto 2</h2>
              <p className="text-gray-600">
                Descripción del producto 2. Sed ut perspiciatis unde omnis iste
                natus error.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Agregar al carrito
              </button>
            </div>
          </div>

          {/* Producto 3 */}
          <div className="bg-white rounded-lg shadow-md">
            <Image
              src={"https://res.cloudinary.com/dhrfu31jp/image/upload/v1688332349/lasetubal/home/reels_2_vprdy9.jpg"}
              alt="Producto 3"
              width={670}
              height={300}
              className="rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Producto 3</h2>
              <p className="text-gray-600">
                Descripción del producto 3. Nemo enim ipsam voluptatem quia
                voluptas.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Agregar al carrito
              </button>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Tienda de Productos de Caza, Pesca
            y Camping
          </p>
        </footer>
      </main>
    </>
  );
}

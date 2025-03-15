import React from "react";
import Image from "next/image";
import img from "../../../public/hero.png";

export default function Header() {
  return (
    <header className="relative">
      <div className="absolute" />
      <div className="relative">
        <div className="overflow-hidden">
          <Image
            priority
            width={1920}
            height={200}
            className="w-full h-full"
            src={img}
            alt=" Aguara Indumentaria"
          />
        </div>
        {/* <div className="absolute inset-0 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 flex flex-col justify-center items-center">
          <h1 className="mt-1 text-center font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-7xl text-white">
            Tienda Online de Aguara Indumentaria
          </h1>
        </div> */}
      </div>
    </header>
  );
}

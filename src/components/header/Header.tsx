import React from "react";
import Image from "next/image";
import img from "../../../public/hero.png";

const Header: React.FC = () => {
  return (
    <header className="relative">
      <div className="overflow-hidden">
        
      </div>
      <div className="absolute inset-0 mx-auto max-w-7xl px-4 py-16 flex flex-col justify-center items-center">
        <h1 className="mt-1 text-center font-bold uppercase text-gray-900 text-5xl">
          Tienda Online de Aguara Indumentaria
        </h1>
      </div>
    </header>
  );
};

export default Header;
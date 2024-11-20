import React from 'react'
import fav from '@/app/constants/Fav-data'
import Image from 'next/image'

// Definisikan tipe data untuk item
interface FavItem {
  id: number;
  name: string;
  colspan: string;
  image: string;
  alt: string;
}


const Fav: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4 grid-flow-row">
      {fav.map((item: FavItem) => (
        <div key={item.id} className={`${item.colspan} relative group`}>
          <p className="text-md font-semibold text-white absolute bottom-7 left-6">
            {item.name}
          </p>
          <Image
            src={item.image}
            alt={item.alt}
            className="w-full h-64 rounded-md object-cover group-hover:brightness-50 transition-all duration-200"
          />
        </div>
      ))}
    </div>
  );
};

export default Fav;

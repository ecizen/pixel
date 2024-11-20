'use client'
import React from 'react'
import Image from 'next/image'
import Infinitdata from '@/app/constants/Infinite-data'

interface InfiniteCardProps {
  direction: 'left' | 'right'; // limiting direction to 'left' or 'right'
}

const InfiniteCard = ({ direction }: InfiniteCardProps) => {
  const scrollClass = direction === 'left' ? 'animate-scroll-left-' : 'animate-scroll-right';

  return (
    <div className={`relative overflow-hidden w-full h-52`}>
      <div className={`absolute ${scrollClass} flex w-full h-full gap-4`}>
        {Infinitdata.map((data) => (
          <Image 
            key={data.id} 
            src={data.image} 
            alt={data.name} 
            className="object-contain h-52 w-auto" 
            width={200} // Add width and height for image optimization
            height={208} 
          />
        ))}
      </div>
    </div>
  );
}

export default InfiniteCard;

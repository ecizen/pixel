'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SiginForm from './sign-in-form';

export default function Navbar() {
   const [isScrolled, setIsScrolled] = useState(false);


   // Handle scroll event untuk navbar
   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 50); // Menentukan scroll untuk mengubah background navbar
     };

     window.addEventListener('scroll', handleScroll);

     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
   }, []);

   const Item = [
     { id: 1, label: 'Home', href: '/' },
     { id: 2, label: 'Photos', href: '/photos' },
     { id: 3, label: 'Vectors', href: '/vectorss' },
     { id: 4, label: 'Illustrator', href: '/ilustator' },
     { id: 5, label: 'Template', href: '/template' },
     { id: 6, label: '3D', href: '/3d' },
     { id: 7, label: 'About', href: '/about' },
   ];

   return (
     <div className={` ${isScrolled ? 'bg-blue-400 z-20' : 'bg-none'} lg:px-8 px-4 py-6 flex justify-between items-center fixed top-0 w-full transition-all duration-300 ease-in-out`}>
        <div>
           <h1 className='text-2xl font-bold text-white'>pixel snap</h1>
        </div>
        <ul className='hidden gap-6 lg:flex'>
          {Item.map((item) => (
              <li key={item.id}>
                <a href={item.href} className='text-sm text-white hover:font-semibold hover:bg-blue-500 transition-all duration-300 ease-in-out font-medium'>
                  {item.label}
                </a>
              </li>
          ))}
        </ul>
        <div>
          <SiginForm/>
        </div>
     </div>
   );
}

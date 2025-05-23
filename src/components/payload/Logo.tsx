import React from 'react';
import logo from '@/assets/logo.png'; // Make sure you have your correct images referenced here
import logoDark from '@/assets/logo.png';  // Make sure you have your correct images referenced here
import Image from 'next/image';

export default function Logo() {
  return (
    <div>
      <Image className="h-20 object-contain dark:hidden" src={logo} alt="" />
      <Image className="h-20 object-contain hidden dark:block" src={logoDark} alt="" />
    </div>
  );
}
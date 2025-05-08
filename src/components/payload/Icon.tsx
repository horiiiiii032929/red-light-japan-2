import React from 'react';
import logo from '@/assets/logo.png';
import Image from 'next/image';

export default function Icon() {
  return (
    <div>
      <Image className="w-12" src={logo} alt="" />
    </div>
  );
}
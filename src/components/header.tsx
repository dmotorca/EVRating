'use client';

import React from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Home } from 'lucide-react';

import useScroll from '@/app/hooks/use-scroll';
import { cn } from '@/lib/utils';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75': scrolled,
          'border-b border-gray-200 hidden': selectedLayout && scrolled, //On scroll it hides then comes back
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className={cn(
              'flex flex-row space-x-3 items-center justify-center md:hidden',
              {
                '': scrolled,
              }
            )}
          >
            <span className="h-7 w-7 rounded-lg">
              <Home className="h-7" /> {/*This is where the logo is*/}
            </span>
            <span className="font-bold text-xl flex">AbebaGroup</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <span className="font-semibold text-sm">AG</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

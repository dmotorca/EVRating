import React from 'react';

import Image from 'next/image';

const Footer = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/dmotorca"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons8-github.svg"
            alt="GitHub icon"
            width={20}
            height={20}
          />
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={18}
            height={18}
          />
          Portfolio
        </a>
      </footer>
    </div>
  );
};

export default Footer;

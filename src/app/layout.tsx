import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Header from '@/components/header';
import SideNav from '@/components/side-nav';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'EV Rating',
  description: 'EV Rating',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SideNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

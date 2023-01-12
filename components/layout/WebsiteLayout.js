import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

export const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Chimoney' : 'Chimoney'}</title>
        <meta name="description" content="Chimoney Shopping Cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

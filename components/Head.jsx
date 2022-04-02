import React from 'react';
import NextHead from 'next/head';

const Head = ({ title }) => {
  return (
    <NextHead>
      <title>
        Marmite {title ? '| ' : ''} {title}
      </title>
      <meta name="description" content="Free Web tutorials" />
      <meta name="keywords" content="HTML, CSS, JavaScript" />
      <meta name="author" content="Net Ninja | Huri Dev" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;

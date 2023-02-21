import React, { useState } from 'react';
import NewProduct from '../components/NewProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

export default function Home() {
  

  return (
    <>
    <Welcome/>
   <NewProduct/>
   <AllProducts/>

    </>
  );
}


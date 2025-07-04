// hooks/useProducts.js
import { useState } from 'react';
import { INITIAL_PRODUCTS } from '../constants';

export const useProducts = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id)) + 1,
      rating: 4.5,
      sales: 0
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (productData) => {
    setProducts(prev => 
      prev.map(p => p.id === productData.id ? productData : p)
    );
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };
};
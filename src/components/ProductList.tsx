
import React from 'react';
import { PRODUCTS } from '@/constants/shopping';
import { Button } from '@/components/ui/button';

interface ProductListProps {
  onAddToCart: (product: typeof PRODUCTS[0], quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {PRODUCTS.map(product => (
          <div 
            key={product.id} 
            className="bg-white border rounded-lg p-4"
          >
            <h3 className="font-medium mb-1">{product.name}</h3>
            <p className="text-black font-medium mb-3">₹{product.price}</p>
            
            <Button 
              onClick={() => onAddToCart(product, 1)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              size="sm"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

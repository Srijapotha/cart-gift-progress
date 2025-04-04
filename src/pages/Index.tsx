
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ProductList from '@/components/ProductList';
import CartDisplay from '@/components/CartDisplay';
import { PRODUCTS, FREE_GIFT, THRESHOLD } from '@/constants/shopping';
import { Card, CardContent } from '@/components/ui/card';

const Index: React.FC = () => {
  const [cart, setCart] = useState<Array<{ product: any; quantity: number }>>([]);
  const [freeGiftAdded, setFreeGiftAdded] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const addToCart = (product: typeof PRODUCTS[0], quantity: number = 1) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      ));
      toast.success(`Added ${quantity} more ${product.name} to cart`);
    } else {
      setCart([...cart, { product, quantity }]);
      toast.success(`Added ${product.name} to cart`);
    }
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      setCart(cart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      ));
    }
  };

  const removeItem = (productId: number) => {
    // Prevent removing free gift
    if (productId === FREE_GIFT.id) return;
    
    const itemToRemove = cart.find(item => item.product.id === productId);
    if (itemToRemove) {
      setCart(cart.filter(item => item.product.id !== productId));
      toast.info(`Removed ${itemToRemove.product.name} from cart`);
    }
  };

  useEffect(() => {
    const subtotal = calculateSubtotal();
    
    if (subtotal >= THRESHOLD && !freeGiftAdded) {
      setCart([...cart, { product: FREE_GIFT, quantity: 1 }]);
      setFreeGiftAdded(true);
      toast.success('🎁 Free gift added to your cart!');
    } 
    
    if (subtotal < THRESHOLD && freeGiftAdded) {
      setCart(cart.filter(item => item.product.id !== FREE_GIFT.id));
      setFreeGiftAdded(false);
      toast.info('Free gift removed as your cart total is below the threshold');
    }
  }, [cart, freeGiftAdded]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Shopping Cart App
        </h1>
        
        <div className="text-center mb-6 text-gray-700">
          <p>- When the free gift is applied</p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6 text-center">Shopping Cart</h2>
            
            <ProductList onAddToCart={addToCart} />
            
            <div className="mt-8">
              <CartDisplay 
                cart={cart} 
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

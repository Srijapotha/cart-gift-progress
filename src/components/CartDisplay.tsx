
import React from 'react';
import { THRESHOLD } from '@/constants/shopping';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

type CartItem = {
  product: any;
  quantity: number;
};

interface CartDisplayProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const CartDisplay: React.FC<CartDisplayProps> = ({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const isFreeGift = (id: number) => id === 99; // FREE_GIFT.id is 99
  const subtotal = calculateSubtotal();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg mb-4">Cart Summary</h2>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold">₹{subtotal}</span>
        </div>
        
        {cart.some(item => isFreeGift(item.product.id)) && (
          <div className="text-green-600 text-sm font-medium">
            You got a free Wireless Mouse!
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-4">Cart Items</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-4 bg-gray-50 rounded-md">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <div 
                key={item.product.id} 
                className={`py-3 px-3 border-b last:border-b-0 ${
                  isFreeGift(item.product.id) ? 'bg-white' : 'bg-white'
                }`}
              >
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  {isFreeGift(item.product.id) && (
                    <span className="text-green-600 text-xs font-medium">FREE GIFT</span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    ₹{item.product.price} x {item.quantity} = ₹{item.product.price * item.quantity}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => onRemoveItem(item.product.id)}
                      size="icon"
                      variant="destructive"
                      className="h-6 w-6"
                      disabled={isFreeGift(item.product.id)}
                    >
                      <Minus size={14} />
                    </Button>
                    
                    <span className="w-6 text-center">{item.quantity}</span>
                    
                    <Button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      size="icon"
                      variant="default"
                      className="h-6 w-6 bg-green-500 hover:bg-green-600"
                      disabled={isFreeGift(item.product.id)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDisplay;

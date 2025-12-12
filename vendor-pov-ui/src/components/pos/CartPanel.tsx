import { CartItem } from '@/types/pos'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { ScrollArea } from '@components/ui/scroll-area'

interface CartPanelProps {
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    onUpdateQuantity: ( productId: string, quantity: number ) => void;
    onRemoveItem: ( productId: string ) => void;
    onCheckout: () => void;
    onClear: () => void;
}

export function CartPanel({
    items,
    subtotal,
    tax,
    total,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
    onClear
}: CartPanelProps) {
    if(items.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-full py-12 text-center'>
                <div className='w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4'>
                    <ShoppingCart className='h-8 w-8 text-muted-foreground' />
                </div>
                <h3 className='font-semibold text-foreground mb-1'>Cart is Empty</h3>
                <p className='text-sm text-muted-foreground'>Add items to get started</p>
            </div>
        )
    }
}
import { Product } from '../data/products';
import { useWorkspaceStore } from '../store/useWorkspaceStore';

export default function CategoryModal({ 
  isOpen, onClose, category, items 
}: { isOpen: boolean, onClose: () => void, category: string, items: Product[] }) {
  const { otherItems, updateOtherItemQuantity } = useWorkspaceStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{category}</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {items.map(item => {
            const selected = otherItems.find(oi => oi.product.id === item.id);
            return (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-2xl">
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-blue-600 text-xs font-bold">${item.price}/mo</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                  <button onClick={() => updateOtherItemQuantity(item, -1)} className="w-8 h-8 bg-white rounded-full shadow-sm font-bold">-</button>
                  <span className="font-bold text-sm min-w-[20px] text-center">{selected?.quantity || 0}</span>
                  <button onClick={() => updateOtherItemQuantity(item, 1)} className="w-8 h-8 bg-blue-600 text-white rounded-full shadow-sm font-bold">+</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-6">
          <button onClick={onClose} className="w-full bg-black text-white py-4 rounded-2xl font-bold">Done</button>
        </div>
      </div>
    </div>
  );
}
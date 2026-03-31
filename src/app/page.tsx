"use client";

import { useState, useEffect } from 'react';
import { products, Category } from '../data/products';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryModal from '../components/CategoryModal';
import CheckoutModal from '../components/CheckoutModal';
import CanvasItem from '@/components/CanvasItem';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Category>('Chairs');
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const coreCategories: Category[] = ['Chairs', 'Desks', 'Monitors', 'Accessories'];
  const lifestyleCategories = ['Coffee Station', 'Outdoor Gear', 'Relax Zone', 'Garage Space'];


  const {
    desk, chair, monitors, accessories, otherItems, focusedItemId,
    setDesk, setChair, addMonitor, removeMonitor, addAccessory, removeAccessory, setFocusedItemId, removeChair, removeDesk
  } = useWorkspaceStore();
  useEffect(() => {
    // Jangan munculkan jika semua item masih kosong (saat pertama buka web)
    if (!desk && !chair && monitors.length === 0 && accessories.length === 0) return;

    setShowHint(true);

    const timer = setTimeout(() => setShowHint(false), 3000); // Muncul selama 3 detik
    return () => clearTimeout(timer);
  }, [desk?.id, chair?.id, monitors.length, accessories.length]);

  const filteredProducts = products.filter((product) => product.category === activeTab);

  const totalOtherPrice = otherItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const corePrice = (desk?.price || 0) + (chair?.price || 0) +
    monitors.reduce((s, m) => s + m.price, 0) +
    accessories.reduce((s, a) => s + a.price, 0);

  const handleProductClick = (product: typeof products[0]) => {
    if (product.category === 'Desks') setDesk(product);
    else if (product.category === 'Chairs') setChair(product);
    else if (product.category === 'Monitors') addMonitor(product);
    else if (product.category === 'Accessories') addAccessory(product);
  };

  return (
    <main className="flex h-screen w-full bg-white text-gray-800 overflow-hidden">

      {/* SIDEBAR KIRI */}
      <aside className="w-[35%] border-r border-gray-200 flex flex-col bg-gray-50 h-full z-50">
        <div className="p-6 bg-white shrink-0">
          <h1 className="text-2xl font-bold">Design Your Workspace!</h1>
          <p className="text-sm text-gray-500 mt-1">Pick your core furniture</p>
        </div>

        <div className="flex px-4 pt-4 bg-white border-b border-gray-200 shrink-0">
          {coreCategories.map((category) => (
            <button key={category} onClick={() => setActiveTab(category)}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-colors ${activeTab === category ? 'bg-gray-50 text-blue-600 border-t border-l border-r border-gray-200' : 'bg-white text-gray-400 border-transparent hover:text-gray-600'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4 pb-4">
            {filteredProducts.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product)}
                className="bg-white p-4 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center hover:border-blue-400 cursor-pointer transition-all"
              >
                <img src={product.imageUrl} className="w-16 h-16 object-contain mb-2" alt={product.name} />
                <div className="text-center">
                  <div className="font-semibold text-xs leading-tight">{product.name}</div>
                  <div className="text-[10px] text-green-600 font-bold mt-1">${product.price}/mo</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-sm font-bold uppercase">Total Price</span>
            <span className="text-2xl font-black text-blue-600">${corePrice + totalOtherPrice}</span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold"
          >
            Check Out Order
          </button>
        </div>
      </aside>

      {/* AREA KANAN (CANVAS TUNGGAL) */}
      <section className="w-[65%] flex flex-col h-full bg-gray-100/30">
        <div
          className="flex-1 relative flex items-center justify-center overflow-hidden"
          onClick={() => setFocusedItemId(null)} // Klik background = hilangkan fokus
        >
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

          <AnimatePresence mode="wait">
            {showHint && (
              <motion.p
                key="hint-text"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-12 z-[100] pointer-events-none 
                          bg-white px-6 py-2.5 rounded-full shadow-xl border border-slate-200 
                          text-slate-800 text-xs font-bold uppercase tracking-widest 
                          flex items-center gap-2"
              >
                Drag the items to reposition
              </motion.p>
            )}
          </AnimatePresence>

          <div className="relative w-full h-full flex items-center justify-center">

            <div className="relative w-[1100px] h-[800px] flex items-center justify-center translate-y-24">
              {/* 1. Meja */}
              {desk && (
                <CanvasItem
                  id={desk.id}
                  label="Desk"
                  removeFn={removeDesk}
                  zIndexBase={10}
                  initialPos={{ left: '0%', x: '0%' }}
                  scaleFocus={1.02}
                >
                  <img src={desk.imageUrl} style={{ width: '800px' }} className="max-w-none drop-shadow-2xl" />
                </CanvasItem>
              )}

              {/* 2. Monitors */}
              {/* 2. Monitors */}
              {monitors.map((m) => (
                <CanvasItem
                  key={m.id}
                  id={m.id}
                  label="Monitor"
                  removeFn={() => removeMonitor(m.id)}
                  zIndexBase={15}
                  initialPos={{
                    left: `calc(40% + ${m.initialX || 0}px)`,
                    bottom: '60%',
                    x: '-50%'
                  }}
                >
                  <img
                    src={m.imageUrl}
                    style={{ width: `${m.size}px` }}
                    className="max-w-none drop-shadow-md"
                  />
                </CanvasItem>
              ))}
              {/* 3. Accessories (Mendarat di Meja) */}
              {accessories.map((acc, index) => {
                // --- LOGIKA SEBAR (SPREAD LOGIC) ---
                // Barang pertama di tengah (50%), barang kedua agak ke kanan, ketiga agak ke kiri, dst.
                const offsets = [50, 60, 40, 70, 30];
                const currentLeft = offsets[index % offsets.length] + '%';

                return (
                  <CanvasItem
                    key={acc.id}
                    id={acc.id}
                    label="Accessory"
                    removeFn={() => removeAccessory(acc.id)}
                    zIndexBase={16}
                    initialPos={{
                      left: `calc(40% + ${acc.initialX || 0}px)`, // Menggunakan logika sebar di atas
                      top: '25%',        // <-- Turunkan kordinat ke area permukaan meja (sesuaikan angkanya jika kurang pas)
                      x: '-50%',
                      y: '50%'
                    }}
                    scaleFocus={1.15} // Bikin aksesoris membesar sedikit lebih banyak saat difokuskan karena ukurannya kecil
                  >
                    <img
                      src={acc.imageUrl}
                      style={{ width: `${acc.size}px` }}
                      className="max-w-none drop-shadow-md"
                      alt={acc.name}
                    />
                  </CanvasItem>
                );
              })}

              {/* 4. Kursi */}
              {chair && (
                <CanvasItem
                  id={chair.id}
                  label="Chair"
                  removeFn={removeChair}
                  zIndexBase={20}
                  initialPos={{ left: '75%', top: '10%', x: '-50%' }}
                >
                  <img src={chair.imageUrl} style={{ width: `${chair.size}px` }} className="max-w-none drop-shadow-xl" />
                </CanvasItem>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="h-[200px] bg-white border-t border-gray-200 p-6 z-40 flex gap-4">
          {lifestyleCategories.map((cat) => {
            const itemCount = otherItems.filter(oi => oi.product.category === cat).reduce((s, i) => s + i.quantity, 0);
            return (
              <div key={cat} className="flex-1 border-2 border-gray-100 rounded-3xl p-5 bg-gray-50/50 flex flex-col justify-between hover:border-blue-200 transition-all group relative">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{cat}</p>
                  <p className="text-lg font-bold text-gray-800">{itemCount > 0 ? `${itemCount} Items` : 'None'}</p>
                </div>
                <button onClick={() => setOpenModal(cat)} className="absolute bottom-5 right-5 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm hover:bg-blue-600 hover:text-white transition-all">+</button>
              </div>
            );
          })}
        </div>
      </section>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <CategoryModal
        isOpen={!!openModal}
        onClose={() => setOpenModal(null)}
        category={openModal || ''}
        items={products.filter(p => p.category === openModal)}
      />
    </main>
  );
}
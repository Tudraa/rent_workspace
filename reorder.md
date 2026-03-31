             {/* 2. Render Monitors */}
             {/* <Reorder.Group 
               axis="x" 
               values={monitors} 
               onReorder={setMonitors} 
               // KUNCI UTAMA: Gunakan items-end agar semua kaki monitor menempel di garis bawah yang sama
               className="absolute flex items-end gap-4 mb-90" 
               style={{ zIndex: 15 }}
             >
                {monitors.map((m) => (
                  <Reorder.Item 
                    key={m.id}
                    value={m} 
                    className="relative group cursor-grab active:cursor-grabbing flex flex-col justify-end"
                    whileDrag={{ scale: 1.05, zIndex: 50 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  >
                    <img 
                      src={m.imageUrl} 
                      style={{ width: `${m.size}px` }} 
                      className="object-contain drop-shadow-md pointer-events-none max-w-none" 
                      alt="monitor" 
                    />
                    
                  
                    <button 
                      onPointerDown={(e) => e.stopPropagation()} 
                      onClick={() => removeMonitor(m.id)} 
                      className="absolute -top-2 bg-red-500 text-white h-5 rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-50"
                    >✕</button>
                  </Reorder.Item>
                ))}
             </Reorder.Group> */}

// src/data/products.ts

export type CoreCategory = 'Chairs' | 'Desks' | 'Monitors' | 'Accessories';
export type OtherCategory = 'Coffee Station' | 'Outdoor Gear' | 'Relax Zone' | 'Garage Space';

export type Category = CoreCategory | OtherCategory;

export interface Product {
    id: string;
    name: string;
    category: 'Chairs' | 'Desks' | 'Monitors' | 'Accessories' | string;
    price: number;
    imageUrl: string;
    zIndex: number;
    color: string;
    size: number;
    initialX?: number;
}
export const products: Product[] = [
    {
        id: 'desk-1', name: 'Black Desk', category: 'Desks', price: 45,
        imageUrl: 'desks/Black_Desk.png',
        zIndex: 10, color: 'gray', size: 400
    },
    {
        id: 'desk-2', name: 'White Mechanical Adjustable Desk.png', category: 'Desks', price: 30,
        imageUrl: 'desks/White_Mechanical_Adjustable_Desk.png',
        zIndex: 10, color: 'brown', size: 400
    },

    {
        id: 'chair-1', name: 'Black Chair.png', category: 'Chairs', price: 35,
        imageUrl: 'chairs/Black_Chair.png',
        zIndex: 15, color: 'black', size: 400
    },
    {
        id: 'chair-2', name: 'Grey Chair.png', category: 'Chairs', price: 15,
        imageUrl: 'chairs/Grey_Chair.png',
        zIndex: 15, color: 'yellow', size: 400 // 60 cm = 225 px
    },

    // --- MONITORS ---
    {
        id: 'mon-1', name: "27' 5K Apple Studio Display", category: 'Monitors', price: 75,
        imageUrl: "monitors/27'_5K_Apple_Studio_Display.png",
        zIndex: 20, color: 'blue', size: 232 // Lebar fisik 62 cm = 232 px
    },
    {
        id: 'mon-2', name: "34' 4K Curved Monitor", category: 'Monitors', price: 15,
        imageUrl: "monitors/34'_4K_Curved_Monitor.png",
        zIndex: 20, color: 'green', size: 304 // Ultrawide 81 cm = 304 px
    },
    {
        id: 'mon-3', name: "The Xiaomi Mi 23.8' A24i Full HD Monitor", category: 'Monitors', price: 15,
        imageUrl: "monitors/The_Xiaomi_Mi_23.8'_A24i_Full_HD_Monitor.png",
        zIndex: 20, color: 'green', size: 202 // Layar 24" = 54 cm = 202 px
    },
    {
        id: 'mon-4', name: "Xiaomi Mi 23.8' Monitor 1C", category: 'Monitors', price: 15,
        imageUrl: "monitors/Xiaomi_Mi_23.8'_Monitor_1C.png",
        zIndex: 20, color: 'green', size: 202 // Layar 24" = 54 cm = 202 px
    },

    // --- ACCESSORIES ---
    {
        id: 'acc-1', name: 'apple magic keyboard', category: 'Accessories', price: 5,
        imageUrl: 'accessories/apple_magic_keyboard.png.png',
        zIndex: 16, color: 'green', size: 250 // Pot 15 cm = 56 px
    },
    {
        id: 'acc-2', name: 'Logitech mouse', category: 'Accessories', price: 8,
        imageUrl: 'accessories/Logitech_mouse.png',
        zIndex: 17, color: 'yellow', size: 70 // Base 20 cm = 75 px
    },
    {
        id: 'acc-3', name: 'nailong', category: 'Accessories', price: 8,
        imageUrl: 'accessories/nailong.png',
        zIndex: 17, color: 'yellow', size: 70 // Base 20 cm = 75 px
    },

    // --- COFFEE STATION ---
    {
        id: 'cof-1', name: 'Espresso Machine', category: 'Coffee Station', price: 15,
        imageUrl: 'https://ui-avatars.com/api/?name=Coffee&background=444&color=fff',
        zIndex: 18, color: 'Silver', size: 112 // 30 cm = 112 px
    },

    // --- OUTDOOR GEAR ---
    {
        id: 'out-1', name: 'Bali Surfboard', category: 'Outdoor Gear', price: 20,
        imageUrl: 'https://ui-avatars.com/api/?name=Surf&background=00acc1&color=fff',
        zIndex: 18, color: 'Cyan', size: 675 // Papan 180 cm = 675 px
    },
    {
        id: 'out-2', name: 'Scooter Helmet', category: 'Outdoor Gear', price: 5,
        imageUrl: 'https://ui-avatars.com/api/?name=Helmet&background=333&color=fff',
        zIndex: 18, color: 'Matte Black', size: 94 // 25 cm = 94 px
    },
    {
        id: 'out-3',
        name: 'Yamaha NMAX',
        category: 'Outdoor Gear',
        price: 100,
        imageUrl: 'https://ui-avatars.com/api/?name=NMAX&background=212121&color=fff',
        zIndex: 18,
        color: 'Power Grey',
        size: 725 // Panjang motor ~193 cm = 724.7 px (dibulatkan 725)
    },
    {
        id: 'out-4',
        name: 'Yamaha XMAX',
        category: 'Outdoor Gear',
        price: 180,
        imageUrl: 'https://ui-avatars.com/api/?name=XMAX&background=b71c1c&color=fff',
        zIndex: 18,
        color: 'Magma Black',
        size: 819 // Panjang motor ~218 cm = 818.4 px (dibulatkan 819)
    },

    // --- RELAX ZONE ---
    {
        id: 'rel-1', name: 'Comfy Bean Bag', category: 'Relax Zone', price: 10,
        imageUrl: 'https://ui-avatars.com/api/?name=BeanBag&background=ff7043&color=fff',
        zIndex: 12, color: 'Orange', size: 337 // Diameter 90 cm = 337 px
    },

    // --- GARAGE SPACE ---
    {
        id: 'gar-1', name: 'Tool Shelf', category: 'Garage Space', price: 12,
        imageUrl: 'https://ui-avatars.com/api/?name=Tools&background=78909c&color=fff',
        zIndex: 11, color: 'Gray', size: 337 // 90 cm = 337 px
    },
];
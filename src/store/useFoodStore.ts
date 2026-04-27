import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'entree' | 'dessert' | 'drink';
  image: string;
  popular?: boolean;
  dietary?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

interface FoodState {
  items: MenuItem[];
  cart: CartItem[];
  category: string;
  searchQuery: string;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  setCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'f1', name: 'Zia Wings', description: 'Crispy wings tossed in signature spicy glaze', price: 12.99, category: 'appetizer', popular: true, dietary: ['spicy'], image: '🍗' },
  { id: 'f2', name: 'Loaded Nachos', description: 'Tortilla chips with cheese, jalapeños, and sour cream', price: 10.99, category: 'appetizer', image: '🧀' },
  { id: 'f3', name: 'Cloud Dip', description: 'Creamy spinach artichoke dip with toasted bread', price: 9.99, category: 'appetizer', image: '🥖' },
  { id: 'f4', name: 'Lockr Burger', description: 'Double patty, special sauce, lettuce, cheese, pickles', price: 16.99, category: 'entree', popular: true, image: '🍔' },
  { id: 'f5', name: 'JamZia Pizza', description: 'Stone-fired with pepperoni, mushrooms, and olives', price: 18.99, category: 'entree', image: '🍕' },
  { id: 'f6', name: 'Creator Bowl', description: 'Grilled chicken, quinoa, avocado, and tahini dressing', price: 15.99, category: 'entree', popular: true, dietary: ['healthy'], image: '🥗' },
  { id: 'f7', name: 'Network Pasta', description: 'Creamy Alfredo with grilled shrimp and parmesan', price: 19.99, category: 'entree', image: '🍝' },
  { id: 'f8', name: 'Prime Steak', description: '12oz ribeye with garlic butter and roasted vegetables', price: 34.99, category: 'entree', popular: true, image: '🥩' },
  { id: 'f9', name: 'Master Tacos', description: 'Three soft tacos with carnitas, cilantro, and onion', price: 14.99, category: 'entree', image: '🌮' },
  { id: 'f10', name: 'Engine Burrito', description: 'Massive burrito with rice, beans, steak, and guacamole', price: 15.99, category: 'entree', image: '🌯' },
  { id: 'f11', name: 'Zia Cake', description: 'Vanilla sponge with berry compote and whipped cream', price: 8.99, category: 'dessert', popular: true, image: '🍰' },
  { id: 'f12', name: 'Lockr Shake', description: 'Thick chocolate shake with cookie crumbles', price: 7.99, category: 'dessert', image: '🥤' },
  { id: 'f13', name: 'Jam Lemonade', description: 'Fresh-squeezed lemonade with mint', price: 4.99, category: 'drink', image: '🍋' },
  { id: 'f14', name: 'Zia Brew', description: 'Cold brew coffee with vanilla', price: 5.99, category: 'drink', popular: true, image: '☕' },
  { id: 'f15', name: 'Creator Smoothie', description: 'Mixed berry and banana protein smoothie', price: 6.99, category: 'drink', dietary: ['healthy'], image: '🫐' },
];

export const useFoodStore = create<FoodState>()((set, get) => ({
  items: MENU_ITEMS,
  cart: [],
  category: 'all',
  searchQuery: '',

  addToCart: (item) => {
    const existing = get().cart.find((c) => c.id === item.id);
    if (existing) {
      set({ cart: get().cart.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c) });
    } else {
      set({ cart: [...get().cart, { ...item, quantity: 1 }] });
    }
  },

  removeFromCart: (id) => set({ cart: get().cart.filter((c) => c.id !== id) }),

  updateQuantity: (id, qty) => {
    if (qty <= 0) {
      set({ cart: get().cart.filter((c) => c.id !== id) });
    } else {
      set({ cart: get().cart.map((c) => c.id === id ? { ...c, quantity: qty } : c) });
    }
  },

  clearCart: () => set({ cart: [] }),

  setCategory: (cat) => set({ category: cat }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  getCartTotal: () => get().cart.reduce((sum, c) => sum + c.price * c.quantity, 0),
  getCartCount: () => get().cart.reduce((sum, c) => sum + c.quantity, 0),
}));

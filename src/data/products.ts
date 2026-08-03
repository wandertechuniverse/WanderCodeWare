export type Category = 'outerwear' | 'knitwear' | 'accessories' | 'footwear';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  details: string[];
  image: string;
  sizes: string[];
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'The Obsidian Coat',
    price: 450,
    category: 'outerwear',
    description: 'A structured wool-blend coat in deep charcoal. Minimalist silhouette with a hidden button placket and clean-cut lapels.',
    details: ['80% Wool, 20% Polyamide', 'Dry clean only', 'Made in Italy'],
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=900',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: '2',
    name: 'Silk Void Scarf',
    price: 120,
    category: 'accessories',
    description: '100% Mulberry silk scarf in matte black. Hand-rolled edges. An effortless layer for any season.',
    details: ['100% Mulberry Silk', 'Hand-rolled edges', 'Dry clean only'],
    image: '/Scarf.jpg',
    sizes: ['One Size'],
  },
  {
    id: '3',
    name: 'Merino Turtleneck',
    price: 180,
    category: 'knitwear',
    description: 'Fine-gauge merino wool turtleneck. Soft, temperature-regulating, and entirely timeless.',
    details: ['100% Merino Wool', 'Hand wash cold', 'Lay flat to dry'],
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=900',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '4',
    name: 'Leather Weekender',
    price: 650,
    category: 'accessories',
    description: 'Full-grain vegetable-tanned leather bag with aged brass hardware. Built for short journeys, lasting a lifetime.',
    details: ['Full-grain leather', 'Brass hardware', 'Cotton canvas lining', 'Made in Spain'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900',
    sizes: ['One Size'],
    isNew: true,
  },
  {
    id: '5',
    name: 'Monk Strap Loafer',
    price: 320,
    category: 'footwear',
    description: 'Italian calfskin loafers with a single monk strap and hand-burnished finish. Resoleable construction.',
    details: ['Italian calfskin upper', 'Leather sole', 'Hand-burnished', 'Made in Italy'],
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=900',
    sizes: ['7', '8', '9', '10', '11', '12'],
  },
  {
    id: '6',
    name: 'Cashmere Beanie',
    price: 95,
    category: 'knitwear',
    description: 'Soft cashmere-blend ribbed beanie in heather grey. Understated. Essential.',
    details: ['70% Cashmere, 30% Wool', 'Hand wash cold', 'Do not tumble dry'],
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=900',
    sizes: ['One Size'],
  },
];

export const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'knitwear', label: 'Knitwear' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'footwear', label: 'Footwear' },
];

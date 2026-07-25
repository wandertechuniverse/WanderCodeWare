import { useState } from 'react';
import { X } from 'lucide-react';

const lookbookImages = [
  { id: '1', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800', alt: 'Urban Minimalism' },
  { id: '2', src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', alt: 'Winter Layers' },
  { id: '3', src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800', alt: 'Studio Portrait' },
  { id: '4', src: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800', alt: 'Accessory Detail' },
  { id: '5', src: 'https://images.unsplash.com/photo-1550614000-4b9519e02d48?auto=format&fit=crop&q=80&w=800', alt: 'Monochrome Street' },
  { id: '6', src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800', alt: 'Textile Texture' },
];

export default function LookbookPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="py-12 px-6 md:px-8">
      <div className="text-center mb-16 space-y-4">
        <p className="text-[11px] tracking-[0.35em] uppercase text-luxury-500">Visual Diary</p>
        <h1 className="font-serif text-5xl text-luxury-900 dark:text-luxury-50">The Lookbook</h1>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto [column-fill:_balance]">
        {lookbookImages.map((img) => (
          <div
            key={img.id}
            className="break-inside-avoid mb-6 cursor-pointer group relative overflow-hidden"
            onClick={() => setSelectedImage(img.src)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-[10px] tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50">
              {img.alt}
            </p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-luxury-950/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-luxury-50 hover:text-luxury-400 transition-colors"
            aria-label="Close"
            onClick={() => setSelectedImage(null)}
          >
            <X size={28} />
          </button>
          <img
            src={selectedImage}
            alt="Full view"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

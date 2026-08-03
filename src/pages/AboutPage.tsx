export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
      <section className="text-center space-y-6">
        <p className="text-[11px] tracking-[0.35em] uppercase text-luxury-500">About</p>
        <h1 className="font-serif text-5xl text-luxury-900 dark:text-luxury-50">Our Story</h1>
        <p className="text-lg font-light leading-relaxed text-luxury-500 max-w-xl mx-auto">
          Wander CodeWare was born from a desire to strip away the unnecessary. In a world of noise, we offer silence. In a world of trends, we offer timelessness.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-square overflow-hidden border border-luxury-200 dark:border-luxury-800">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
            alt="Studio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-5">
          <h2 className="font-serif text-2xl text-luxury-900 dark:text-luxury-50">The Philosophy</h2>
          <p className="text-sm font-light leading-relaxed text-luxury-500">
            Every piece is designed with intention. We use only the finest materials, sourced ethically and crafted by artisans who share our vision for quality over quantity.
          </p>
          <p className="text-sm font-light leading-relaxed text-luxury-500">
            Our monochromatic palette is not just a design choice — it is a statement. It allows the texture, cut, and silhouette to speak for themselves.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-luxury-200 dark:border-luxury-800">
        {[
          { label: 'Material', body: 'Natural fibres only — wool, cashmere, silk, leather. Nothing synthetic.' },
          { label: 'Craft', body: 'Handmade in ateliers with decades of heritage. Runs capped at 50 units.' },
          { label: 'Longevity', body: 'All leather goods are resoleable. All knitwear is repairable.' },
        ].map(({ label, body }) => (
          <div key={label} className="px-6 py-8 border-r border-b border-luxury-200 dark:border-luxury-800 last:border-r-0">
            <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-500 mb-3">{label}</p>
            <p className="text-sm font-light leading-relaxed text-luxury-700 dark:text-luxury-300">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

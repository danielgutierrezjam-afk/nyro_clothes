
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // We use the export?format=csv URL to get the CSV data directly
                const response = await fetch('https://docs.google.com/spreadsheets/d/15DFtyMIbVWA9S-Wiq966nenyKgiM6xs9MK9G96zmJw0/export?format=csv&gid=1105349084');
                const csvText = await response.text();

                // Parse CSV
                const lines = csvText.split('\n');
                const parsedProducts = [];

                // Skip header (index 0)
                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].trim()) continue;

                    // Simple CSV split handling quotes for commas inside values if needed
                    // In this format, simpler split might work but let's be careful
                    const row = lines[i].split(',');
                    // Si el inicio de la fila parece el encabezado literal de Categoria, saltar
                    if (row[0] && row[0].trim().toUpperCase().includes('CATEGOR')) continue;

                    if (row.length >= 6) {
                        const imagen = row[5].trim();
                        const precio = row[3].trim();

                        // Validar que el precio tiene algún dígito numérico para parsearlo validamente
                        const precioNum = parseFloat(precio.replace(/[^\d.,]/g, '').replace(',', '.'));

                        // Validar imagen (empieza por http), y precio (!isNaN y sin USD CNY)
                        if (
                            imagen &&
                            imagen.startsWith('http') &&
                            precio &&
                            !precio.includes('USD CNY') &&
                            !isNaN(precioNum)
                        ) {
                            parsedProducts.push({
                                categoria: row[0].trim(),
                                producto: row[1].trim(),
                                nombre: row[2].trim(),
                                precio: precio,
                                link: row[4].trim(),
                                imagen: imagen
                            });
                        }
                    }
                }
                setProductos(parsedProducts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const categoriasMap = new Map();
    productos.forEach(p => {
        if (!categoriasMap.has(p.producto)) {
            // Find a valid image for this category
            let img = p.imagen;
            if (img.includes('geilicdn.com')) {
                img = 'https://images.weserv.nl/?url=' + img;
            }
            categoriasMap.set(p.producto, {
                nombre: p.producto,
                count: 1,
                imagen: img
            });
        } else {
            categoriasMap.get(p.producto).count++;
        }
    });
    const categoriasArray = Array.from(categoriasMap.values());

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <a href="/" className="flex items-center gap-2 group cursor-pointer">
                            <div className="text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">bolt</span>
                            </div>
                            {/* Brand text always visible */}
                            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Nyro Clothes</h1>
                        </a>
                        
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-sm font-medium hover:text-primary transition-colors" href="/productos">Productos</a>
                            <a className="text-sm font-medium hover:text-primary transition-colors" href="/ayuda">Ayuda</a>
                        </nav>
                        
                        {/* Mobile Menu Button + Promo */}
                        <div className="flex items-center gap-2 md:hidden">
                            <a href="https://oopbuy.com/register?inviteCode=5QZ5ABZLY" target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight shadow-sm">
                                🎁 400€ GRATIS
                            </a>
                            <button 
                                className="text-slate-900 dark:text-white flex items-center"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <span className="material-symbols-outlined text-3xl">
                                    {isMenuOpen ? 'close' : 'menu'}
                                </span>
                            </button>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <a href="https://oopbuy.com/register?inviteCode=5QZ5ABZLY" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all">
                                🎁 400€ GRATIS EN OOPBUY
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="md:hidden bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
                            <a className="text-lg font-bold hover:text-primary transition-colors uppercase tracking-widest" href="/productos" onClick={() => setIsMenuOpen(false)}>Productos</a>
                            <a className="text-lg font-bold hover:text-primary transition-colors uppercase tracking-widest" href="/ayuda" onClick={() => setIsMenuOpen(false)}>Ayuda</a>
                            <a href="https://oopbuy.com/register?inviteCode=5QZ5ABZLY" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-primary text-white px-4 py-4 rounded-xl text-sm font-black uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>
                                🎁 400€ GRATIS EN OOPBUY
                            </a>
                        </div>
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-4 md:py-12 lg:py-24">
                    <div className="space-y-6 flex flex-col items-start text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-xs">verified</span>
                            Selección Premium
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl font-medium text-slate-500 dark:text-slate-400">Descubre los mejores chollos</p>
                            <h2 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter text-slate-900 dark:text-white uppercase max-w-4xl">
                                EL LUGAR #1 EN PRODUCTOS DE <span className="text-primary">CALIDAD</span>
                            </h2>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                            <a href="/productos" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all text-center">Explorar Catálogo</a>
                            <a href="https://oopbuy.com/register?inviteCode=5QZ5ABZLY" target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700 text-center">
                                Cupón 400€ OOPBUY
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-4 h-[400px] md:h-[600px] overflow-hidden relative fade-y">
                        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-background-light dark:from-background-dark via-transparent to-background-light dark:to-background-dark"></div>

                        {/* Column 1 - Scroll Up */}
                        <div className="flex flex-col gap-4 animate-scroll-up">
                            {productos.slice(0, 10).concat(productos.slice(0, 10)).map((prod, idx) => (
                                <div key={`c1-${idx}`} className="w-[110px] md:w-[150px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
                                    <div className="aspect-square bg-slate-100 dark:bg-slate-800" style={{ backgroundImage: `url('${prod.imagen.includes('geilicdn.com') ? 'https://images.weserv.nl/?url=' + prod.imagen : prod.imagen}')`, backgroundSize: "cover" }}></div>
                                    <div className="p-2">
                                        <p className="text-[8px] md:text-[10px] font-bold truncate">{prod.nombre} {prod.producto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Column 2 - Scroll Down */}
                        <div className="flex flex-col gap-4 animate-scroll-down">
                            {productos.slice(10, 20).concat(productos.slice(10, 20)).map((prod, idx) => (
                                <div key={`c2-${idx}`} className="w-[110px] md:w-[150px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
                                    <div className="aspect-square bg-slate-100 dark:bg-slate-800" style={{ backgroundImage: `url('${prod.imagen.includes('geilicdn.com') ? 'https://images.weserv.nl/?url=' + prod.imagen : prod.imagen}')`, backgroundSize: "cover" }}></div>
                                    <div className="p-2">
                                        <p className="text-[8px] md:text-[10px] font-bold truncate">{prod.nombre} {prod.producto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Column 3 - Scroll Up Slow */}
                        <div className="flex flex-col gap-4 animate-scroll-up-slow mt-8">
                            {productos.slice(20, 30).concat(productos.slice(20, 30)).map((prod, idx) => (
                                <div key={`c3-${idx}`} className="w-[110px] md:w-[150px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
                                    <div className="aspect-square bg-slate-100 dark:bg-slate-800" style={{ backgroundImage: `url('${prod.imagen.includes('geilicdn.com') ? 'https://images.weserv.nl/?url=' + prod.imagen : prod.imagen}')`, backgroundSize: "cover" }}></div>
                                    <div className="p-2">
                                        <p className="text-[8px] md:text-[10px] font-bold truncate">{prod.nombre} {prod.producto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>



                <section className="mb-20 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 px-4 sm:px-0">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">CATEGORÍAS DESTACADAS</h2>
                        <a href="/productos" className="border-2 border-primary text-primary px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-1 hover:bg-primary hover:text-white transition-all">
                            TODOS LOS PRODUCTOS <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>

                    <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] gap-4 py-4" style={{ willChange: "transform" }}>
                        {loading && categoriasArray.length === 0 ? (
                            <div className="w-screen flex justify-center items-center py-20 uppercase font-black italic text-slate-700">
                                Cargando categorías...
                            </div>
                        ) : (
                            [...categoriasArray, ...categoriasArray].map((cat, idx) => (
                                <a key={`cat-${idx}`} href={`/productos?categoria=${encodeURIComponent(cat.nombre)}`} className="w-[200px] md:w-[260px] h-[260px] md:h-[320px] bg-[#0d1117] rounded-xl overflow-hidden relative flex-shrink-0 group cursor-pointer border border-slate-800 hover:border-primary transition-all duration-300">
                                    <div className="p-5 flex flex-col relative z-10 text-left">
                                        <h3 className="text-white font-black uppercase text-xl leading-tight mb-1">{cat.nombre}</h3>
                                        <p className="text-primary font-bold text-sm tracking-wide">{cat.count} productos</p>
                                    </div>
                                    <div className="absolute inset-0 pt-[100px] overflow-hidden">
                                        <img
                                            src={cat.imagen}
                                            alt={cat.nombre}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            style={{ objectPosition: "bottom" }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-60"></div>
                                </a>
                            ))
                        )}
                    </div>
                </section>

                <section className="mb-20 px-4 sm:px-0">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101722] to-primary p-8 md:p-16 text-center border border-white/10 shadow-2xl shadow-primary/20">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 bg-white/10 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

                        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                            <div className="size-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                                <span className="text-4xl text-primary">🎁</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-tight italic tracking-tighter text-white">
                                ¿TE GUSTARÍA RECIBIR UN <span className="text-white underline decoration-white/30">CUPÓN DE HASTA 400€</span>?
                            </h2>
                            <a href="https://oopbuy.com/register?inviteCode=5QZ5ABZLY" target="_blank" rel="noopener noreferrer" className="bg-white text-primary px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:scale-105 transition-all shadow-lg active:scale-95 uppercase tracking-tight mt-4">
                                CONSEGUIR MI CUPÓN AHORA
                            </a>
                        </div>
                    </div>
                </section>


            </main>

            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        <div>
                            <h4 className="text-primary font-black uppercase italic mb-4">Información legal</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                Nyro Clothes actúa únicamente como un directorio externo de enlaces hacia productos de terceros. Nosotros no vendemos productos directamente ni gestionamos transacciones, envíos o devoluciones. Al hacer clic en un enlace, serás redirigido a la plataforma del vendedor final.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-primary font-black uppercase italic mb-4">Ética y Transparencia</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                En Nyro Clothes no apoyamos ni promovemos la venta de falsificaciones. Todos los productos listados son seleccionados bajo estrictos criterios de calidad. Si encuentras algún contenido inapropiado, por favor repórtalo en nuestro canal de ayuda.
                            </p>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-2xl">bolt</span>
                            <span className="text-lg font-black tracking-tight uppercase italic">Nyro Clothes</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            © 2026 Nyro Clothes. Todos los derechos reservados.
                        </p>
                        <div className="flex gap-6">
                            <a className="text-slate-400 hover:text-primary transition-colors" href="/product"><span className="material-symbols-outlined">share</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="/product"><span className="material-symbols-outlined">info</span></a>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}

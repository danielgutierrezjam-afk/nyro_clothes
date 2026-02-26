import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Productos() {
    const query = useQuery();
    const navigate = useNavigate();
    const initialCategory = query.get('categoria');

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(initialCategory || 'Todos');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://docs.google.com/spreadsheets/d/15DFtyMIbVWA9S-Wiq966nenyKgiM6xs9MK9G96zmJw0/export?format=csv&gid=1105349084');
                const csvText = await response.text();

                const lines = csvText.split('\n');
                const parsedProducts = [];
                const catSet = new Set();

                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].trim()) continue;

                    const row = lines[i].split(',');
                    // Si el inicio de la fila parece el encabezado literal de Categoria, saltar
                    if (row[0] && row[0].trim().toUpperCase().includes('CATEGOR')) continue;

                    if (row.length >= 6) {
                        const imagen = row[5].trim();
                        const precio = row[3].trim();
                        const precioNum = parseFloat(precio.replace(/[^\d.,]/g, '').replace(',', '.'));

                        if (
                            imagen &&
                            imagen.startsWith('http') &&
                            precio &&
                            !precio.includes('USD CNY') &&
                            !isNaN(precioNum)
                        ) {
                            const prodCategory = row[1].trim();
                            catSet.add(prodCategory);

                            parsedProducts.push({
                                categoria: row[0].trim(),
                                producto: row[1].trim(),
                                nombre: row[2].trim(),
                                precio: precio,
                                link: row[4].trim(),
                                imagen: imagen.includes('geilicdn.com') ? 'https://images.weserv.nl/?url=' + imagen : imagen
                            });
                        }
                    }
                }
                setProductos(parsedProducts);
                setCategorias(['Todos', ...Array.from(catSet)]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const filteredProducts = productos.filter(p => {
        const matchesCategory = activeCategory === 'Todos' || p.producto === activeCategory;
        const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat);
        setIsCategoriesExpanded(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white font-sans selection:bg-primary/20 selection:text-primary pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <a href="/" className="flex items-center gap-2 group cursor-pointer">
                                <div className="text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">bolt</span>
                                </div>
                                <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Nyro Clothes</h1>
                            </a>
                        </div>
                        
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-sm font-medium text-primary transition-colors" href="/productos">Productos</a>
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
                            <a className="text-lg font-bold hover:text-primary transition-colors uppercase tracking-widest text-primary" href="/productos" onClick={() => setIsMenuOpen(false)}>Productos</a>
                            <a className="text-lg font-bold hover:text-primary transition-colors uppercase tracking-widest" href="/ayuda" onClick={() => setIsMenuOpen(false)}>Ayuda</a>
                        </div>
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight italic text-center md:text-left">TODOS LOS PRODUCTOS</h1>
                </div>

                {/* Horizontal Filter Bar */}
                <section className="mb-10 lg:mb-16 space-y-6">
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto md:mx-0">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white"
                        />
                    </div>

                    {/* Categories Accordion for Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                            className="w-full flex items-center justify-between bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-3 font-black uppercase tracking-widest text-sm hover:border-primary transition-colors"
                        >
                            <span>FILTRAR POR CATEGORÍA {activeCategory !== 'Todos' && <span className="text-primary">: {activeCategory}</span>}</span>
                            <span className={`material-symbols-outlined transition-transform duration-300 ${isCategoriesExpanded ? 'rotate-180' : ''}`}>
                                expand_more
                            </span>
                        </button>
                        
                        {isCategoriesExpanded && (
                            <div className="mt-2 p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                {categorias.map((cat, idx) => {
                                    const isActive = activeCategory === cat;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleCategoryClick(cat)}
                                            className={`px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all border-2 ${isActive
                                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                                : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Categories Desktop Grid */}
                    <div className="hidden md:flex flex-wrap gap-2 pb-4 justify-start">
                        {categorias.map((cat, idx) => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all border-2 ${isActive
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                        : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary'
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Grid */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-slate-400 dark:text-slate-500">
                            {activeCategory} <span className="text-lg font-medium">({filteredProducts.length})</span>
                        </h2>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 mx-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            filteredProducts.map((prod, index) => (
                                <div key={index} className="flex flex-col gap-3 group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-primary transition-colors shadow-sm">
                                    <div className="aspect-square w-full rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative" data-alt={prod.nombre} style={{ backgroundImage: `url('${prod.imagen}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
                                        <div className="absolute top-3 right-3 flex gap-1">
                                            <span className="bg-primary text-white text-[10px] px-2 py-1 rounded font-black uppercase tracking-wider shadow-lg">BEST SELLER</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-sm line-clamp-2 leading-tight uppercase group-hover:text-primary transition-colors">{prod.nombre} {prod.producto}</h4>
                                        <p className="text-xl font-black text-primary">{prod.precio}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-2">
                                        <a href={prod.link} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-primary text-white hover:bg-primary/90 transition-all py-3 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20">VER EN OOPBUY</a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

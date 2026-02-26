const fs = require('fs');

// 1. Update index.css
let cssContent = fs.readFileSync('src/index.css', 'utf8');

const keyframesCSS = `
@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes scroll-down {
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0); }
}
.animate-scroll-up { animation: scroll-up 20s linear infinite; }
.animate-scroll-down { animation: scroll-down 25s linear infinite; }
.animate-scroll-up-slow { animation: scroll-up 30s linear infinite; }
`;

if (!cssContent.includes('@keyframes scroll-up')) {
    fs.appendFileSync('src/index.css', keyframesCSS);
    console.log('Added keyframes to index.css');
}

// 2. Update Home.jsx to split products into 3 columns
let homeContent = fs.readFileSync('src/Home.jsx', 'utf8');

// Replace the Hero section to include the grid
const heroRegex = /<section className="grid grid-cols-1 gap-12 items-center py-12 lg:py-24 text-center">([\s\S]*?)<\/section>/;

const newHero = `<section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-24">
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
                        <div className="flex gap-4 pt-4">
                            <a href="#productos" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all">Explorar Catálogo</a>
                            <a href="https://oopbuy.com/register?inviteCode=5QZ5ABZLY" target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700">
                                Cupón 400€ OOPBUY
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:flex gap-4 h-[600px] overflow-hidden relative fade-y">
                        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-background-light dark:from-background-dark via-transparent to-background-light dark:to-background-dark"></div>
                        
                        {/* Column 1 - Scroll Up */}
                        <div className="flex flex-col gap-4 animate-scroll-up">
                            {productos.slice(0, 10).concat(productos.slice(0, 10)).map((prod, idx) => (
                                <div key={\`c1-\${idx}\`} className="w-[150px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
                                    <div className="aspect-square bg-slate-100 dark:bg-slate-800" style={{ backgroundImage: \`url('\${prod.imagen.includes('geilicdn.com') ? 'https://images.weserv.nl/?url=' + prod.imagen : prod.imagen}')\`, backgroundSize: "cover" }}></div>
                                    <div className="p-2">
                                        <p className="text-[10px] font-bold truncate">{prod.nombre} {prod.producto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Column 2 - Scroll Down */}
                        <div className="flex flex-col gap-4 animate-scroll-down">
                            {productos.slice(10, 20).concat(productos.slice(10, 20)).map((prod, idx) => (
                                <div key={\`c2-\${idx}\`} className="w-[150px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
                                    <div className="aspect-square bg-slate-100 dark:bg-slate-800" style={{ backgroundImage: \`url('\${prod.imagen.includes('geilicdn.com') ? 'https://images.weserv.nl/?url=' + prod.imagen : prod.imagen}')\`, backgroundSize: "cover" }}></div>
                                    <div className="p-2">
                                        <p className="text-[10px] font-bold truncate">{prod.nombre} {prod.producto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Column 3 - Scroll Up Slow */}
                        <div className="flex flex-col gap-4 animate-scroll-up-slow mt-8">
                            {productos.slice(20, 30).concat(productos.slice(20, 30)).map((prod, idx) => (
                                <div key={\`c3-\${idx}\`} className="w-[150px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
                                    <div className="aspect-square bg-slate-100 dark:bg-slate-800" style={{ backgroundImage: \`url('\${prod.imagen.includes('geilicdn.com') ? 'https://images.weserv.nl/?url=' + prod.imagen : prod.imagen}')\`, backgroundSize: "cover" }}></div>
                                    <div className="p-2">
                                        <p className="text-[10px] font-bold truncate">{prod.nombre} {prod.producto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>`;

homeContent = homeContent.replace(heroRegex, newHero);
fs.writeFileSync('src/Home.jsx', homeContent);
console.log('Updated Home.jsx with hero scrolling component');

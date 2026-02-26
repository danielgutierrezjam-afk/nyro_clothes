const fs = require('fs');
let content = fs.readFileSync('src/Home.jsx', 'utf8');

// Inject the map grouping logic right before return
if (!content.includes('const categoriasMap = new Map();')) {
    const mapLogic = `    const categoriasMap = new Map();
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

    return (`;

    content = content.replace("    return (", mapLogic);
}

// Replace the entire hardcoded CATEGORÍAS DESTACADAS section
const catSectionRegex = /<section className="mb-20">[\s\S]*?<h2 className="text-3xl font-black uppercase tracking-tight">CATEGORÍAS DESTACADAS<\/h2>[\s\S]*?<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">[\s\S]*?Otros[\s\S]*?<\/div>\s*<\/section>/;

const newCatSection = `<section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black uppercase tracking-tight">CATEGORÍAS DESTACADAS</h2>
                        <a href="/productos" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline transition-all">
                            TODOS LOS PRODUCTOS <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading && categoriasArray.length === 0 ? (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            categoriasArray.map((cat, idx) => (
                                <a key={\`cat-\${idx}\`} href={\`/productos?categoria=\${encodeURIComponent(cat.nombre)}\`} className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer block">
                                    <div className="absolute inset-0 bg-slate-800 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" data-alt={\`Category background: \${cat.nombre}\`} style={{ backgroundImage: \`url('\${cat.imagen}')\` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-white font-black uppercase italic">{cat.nombre}</p>
                                        <p className="text-white/60 text-[10px] font-bold">{cat.count} productos</p>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                </section>`;

if (catSectionRegex.test(content)) {
    content = content.replace(catSectionRegex, newCatSection);
    fs.writeFileSync('src/Home.jsx', content);
    console.log("Replaced categories successfully.");
} else {
    console.log("Could not match the categories regex");
}

const fs = require('fs');
let content = fs.readFileSync('src/Home.jsx', 'utf8');

// Update Categorías section header and grid
const categorySectionRegex = /<h2 className="text-3xl font-black uppercase tracking-tight mb-8">Categorías destacadas<\/h2>\s*<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">/;

const newCategorySectionHeader = `<div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black uppercase tracking-tight">CATEGORÍAS DESTACADAS</h2>
                        <a href="/product" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline transition-all">
                            TODOS LOS PRODUCTOS <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;

content = content.replace(categorySectionRegex, newCategorySectionHeader);

fs.writeFileSync('src/Home.jsx', content);
console.log('Categories section formatted');

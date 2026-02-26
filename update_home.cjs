const fs = require('fs');

let content = fs.readFileSync('src/Home.jsx', 'utf8');

// Update the grid classes
content = content.replace(
    /<div className="grid grid-cols-1 md:grid-cols-2 gap-6">/g,
    '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'
);

// Update product cards
// We need to match <div className="flex flex-col gap-3 group"> and its hidden variants
// Since there are 8 products, let's use a regex to replace the inner content

const productRegex = /<div className="(?:hidden (?:sm|lg):)?flex flex-col gap-3 group">([\s\S]*?)<a href="\/product" className="block text-center w-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all py-2 rounded-lg text-xs font-bold uppercase tracking-wider">Ver en tienda<\/a>\s*<\/div>/g;

content = content.replace(productRegex, (match, innerContent) => {
    // innerContent contains the image div and the space-y-1 div

    // Replace the image badges
    let newInner = innerContent.replace(
        /<div className="absolute bottom-3 left-3 flex gap-1">[\s\S]*?<\/div>/,
        `<div className="absolute top-3 right-3 flex gap-1">
                                    <span className="bg-primary text-white text-[10px] px-2 py-1 rounded font-black uppercase tracking-wider shadow-lg">BEST SELLER</span>
                                </div>`
    );

    // Add uppercase to title
    newInner = newInner.replace(
        /<h4 className="font-bold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">/,
        '<h4 className="font-bold text-sm line-clamp-2 leading-tight uppercase group-hover:text-primary transition-colors">'
    );

    // Change price color to text-primary
    newInner = newInner.replace(
        /<p className="text-lg font-black">/,
        '<p className="text-xl font-black text-primary">'
    );

    return `<div className="flex flex-col gap-3 group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-primary transition-colors shadow-sm">
                            ${newInner.trim()}
                            <div className="flex flex-col gap-2 mt-2">
                                <a href="/product" className="block text-center w-full bg-primary text-white hover:bg-primary/90 transition-all py-3 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20">VER EN OOPBUY</a>
                                <a href="/product" className="block text-center w-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all py-3 rounded-xl text-sm font-black uppercase tracking-widest">CONTROL CALIDAD</a>
                            </div>
                        </div>`;
});

// Write it back
fs.writeFileSync('src/Home.jsx', content);
console.log('Updated src/Home.jsx');

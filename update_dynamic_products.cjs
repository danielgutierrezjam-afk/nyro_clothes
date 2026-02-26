const fs = require('fs');

let content = fs.readFileSync('src/Home.jsx', 'utf8');

// 1. Add useState and useEffect imports
if (!content.includes('import React, { useState, useEffect }')) {
    content = content.replace(
        "import React from 'react';",
        "import React, { useState, useEffect } from 'react';"
    );
}

// 2. Add state and fetch logic to Home component
const componentStartRegex = /export default function Home\(\) {\n    return \(/;

const fetchLogic = `export default function Home() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // We use the export?format=csv URL to get the CSV data directly
                const response = await fetch('https://docs.google.com/spreadsheets/d/15DFtyMIbVWA9S-Wiq966nenyKgiM6xs9MK9G96zmJw0/export?format=csv&gid=1105349084');
                const csvText = await response.text();
                
                // Parse CSV
                const lines = csvText.split('\\n');
                const parsedProducts = [];
                
                // Skip header (index 0)
                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].trim()) continue;
                    
                    // Simple CSV split handling quotes for commas inside values if needed
                    // In this format, simpler split might work but let's be careful
                    const row = lines[i].split(',');
                    if (row.length >= 6) {
                        parsedProducts.push({
                            categoria: row[0].trim(),
                            producto: row[1].trim(),
                            nombre: row[2].trim(),
                            precio: row[3].trim(),
                            link: row[4].trim(),
                            imagen: row[5].trim()
                        });
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

    return (`;

content = content.replace(componentStartRegex, fetchLogic);

// 3. Replace the static grid with dynamic rendering
// We need to match the entire grid inside "Productos destacados"
// It starts with <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// and ends before <div className="mt-12 flex justify-center">

const gridStart = '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">';
const gridEnd = '<div className="mt-12 flex justify-center">';

const startIndex = content.indexOf(gridStart);
const endIndex = content.indexOf(gridEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const dynamicGrid = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            productos.map((prod, index) => (
                                <div key={index} className="flex flex-col gap-3 group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-primary transition-colors shadow-sm">
                                    <div className="aspect-square w-full rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative" data-alt={prod.nombre} style={{ backgroundImage: \`url('\${prod.imagen}')\`, backgroundSize: "cover" }}>
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
                                        <a href="/product" className="block text-center w-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all py-3 rounded-xl text-sm font-black uppercase tracking-widest">CONTROL CALIDAD</a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    `;

    content = content.substring(0, startIndex) + dynamicGrid + content.substring(endIndex);
}

fs.writeFileSync('src/Home.jsx', content);
console.log('Dynamic products added successfully.');

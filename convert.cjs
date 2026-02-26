const fs = require('fs');
let html = fs.readFileSync('code.html', 'utf8');
let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let body = bodyMatch ? bodyMatch[1] : html;

// Convert to JSX
body = body.replace(/class=/g, 'className=');
body = body.replace(/charset=/g, 'charSet=');
body = body.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
body = body.replace(/<img([^>]+[^\/])>/g, '<img$1 />'); // Close img
body = body.replace(/<input([^>]+[^\/])>/g, '<input$1 />'); // Close input
body = body.replace(/<br>/g, '<br />'); // Close br
body = body.replace(/<hr([^>]+[^\/])?>/g, '<hr$1 />'); // Close hr

// Handle simple styles
body = body.replace(/style="([^"]*)"/g, (match, p1) => {
  let obj = {};
  p1.split(';').forEach(s => {
    if (!s.trim()) return;
    let parts = s.split(':');
    if (parts.length < 2) return;
    let k = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
    let v = parts.slice(1).join(':').trim();
    obj[k] = v;
  });
  return `style={${JSON.stringify(obj)}}`;
});

// Safe button replacement
body = body.replace(/<button([^>]*)>([\s\S]*?)<\/button>/gi, (match, attrs, content) => {
  if (content.includes("Ver detalles")) {
    return `<a href="/product" ${attrs}>${content}</a>`;
  } else if (content.includes("Ver en tienda")) {
    return `<a href="/product" className="block text-center w-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all py-2 rounded-lg text-xs font-bold uppercase tracking-wider">Ver en tienda</a>`;
  } else if (content.includes("Únete a nuestro canal")) {
    return `<a href="/product" className="hidden sm:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all"><span className="material-symbols-outlined text-sm">campaign</span>Únete a nuestro canal</a>`;
  }
  return match;
});

// Update grids for products to 1 col mobile, 2 col desktop
body = body.replace(/className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"/g, 'className="grid grid-cols-1 md:grid-cols-2 gap-6"');
body = body.replace(/className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"/g, 'className="grid grid-cols-1 md:grid-cols-2 gap-6"');

// Just some href cleanup
body = body.replace(/href="#"/g, 'href="/product"');
body = body.replace(/stroke-width/g, 'strokeWidth');
body = body.replace(/stroke-linecap/g, 'strokeLinecap');
body = body.replace(/stroke-linejoin/g, 'strokeLinejoin');

fs.writeFileSync('src/Home.jsx', `
import React from 'react';

export default function Home() {
  return (
    <>
      ${body}
    </>
  );
}
`);

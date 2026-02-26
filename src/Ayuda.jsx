import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Ayuda() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white font-sans selection:bg-primary/20 selection:text-primary">
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <a href="/" className="flex items-center gap-2 group cursor-pointer">
                            <div className="text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">bolt</span>
                            </div>
                            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Nyro Clothes</h1>
                        </a>
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-sm font-medium hover:text-primary transition-colors" href="/productos">Productos</a>
                            <a className="text-sm font-medium text-primary transition-colors" href="/ayuda">Ayuda</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <a href="https://oopbuy.com/register?inviteCode=5QZ5ABZLY" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all">
                                🎁 400€ GRATIS EN OOPBUY
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="inline-flex items-center justify-center size-20 rounded-full bg-primary/10 text-primary mb-8 animate-bounce">
                    <span className="material-symbols-outlined text-5xl">contact_support</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-tight italic tracking-tighter">
                    ¿TIENES ALGUNA <span className="text-primary">DUDA</span>?
                </h1>

                <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
                    Estoy aquí para ayudarte. Si tienes cualquier pregunta sobre un producto, un pedido o simplemente quieres saber más, escríbeme directamente por mis redes sociales. Te respondo lo antes posible.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {/* TikTok Card */}
                    <a
                        href="https://www.tiktok.com/@nyro_49"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group"
                    >
                        <div className="size-14 rounded-xl bg-slate-900 dark:bg-black flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                            <svg className="size-7 fill-current" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.1-3.44-3.37-3.47-5.75-.02-1.88.9-3.7 2.3-4.97 1.25-1.12 2.97-1.75 4.67-1.61.1.03.1.15.1.25-.01 1.34-.02 2.68-.03 4.02-.12-.01-.24-.03-.36-.04-1.07-.15-2.23.15-2.98.96-.54.56-.8 1.34-.8 2.12.02.82.35 1.62.92 2.21.6.61 1.48.9 2.33.84 1.05-.03 2.04-.61 2.53-1.54.32-.61.41-1.31.4-2-.02-4.82-.01-9.64-.01-14.46z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sígueme en TikTok</p>
                            <p className="text-xl font-black tracking-tight italic">@nyro_49</p>
                        </div>
                    </a>

                    {/* Instagram Card */}
                    <a
                        href="https://www.instagram.com/nyro_49"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group"
                    >
                        <div className="size-14 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white group-hover:opacity-90 transition-opacity">
                            <svg className="size-7 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sígueme en Instagram</p>
                            <p className="text-xl font-black tracking-tight italic">@nyro_49</p>
                        </div>
                    </a>
                </div>

                <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Volver al Inicio
                    </button>
                </div>
            </main>

            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-2xl">bolt</span>
                            <span className="text-lg font-black tracking-tight uppercase italic">Nyro Clothes</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            © 2026 Nyro Clothes. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

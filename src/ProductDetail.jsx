import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductDetail() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl text-primary">arrow_back</span>
                            <span className="text-sm font-black uppercase">Volver al catálogo</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCX9p8Zs_v952YJEctsPWUkRE0qsD3WE793SKBZEIGKwKvQ2HGi8tDIiZZeKw_GH_0IT7YG3BxWTG9NmGsL09Yu3yt4yCOMa_116It3MWPOjcMUBbDU-WAmZQbxEUYskKPPfd1ibbz7myrGTqYInhrEEarKZWjtdGExVrhd4QuuTvSE2ilwcrH_XSiV2IPtYPEsx-gztgr3tA7Ugi3kC8p7bgM-2pCACt1XEYmol_jBZR3X2Zq8jSDyHvlk4Ggpn0-sIOLWFX9c-O0')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 w-max">
                            <span className="material-symbols-outlined text-xs">local_fire_department</span>
                            Tendencia
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">Sneakers Limited Edition 'Retro'</h1>
                        <p className="text-3xl font-black text-primary mb-8">129.99€ <span className="text-lg text-slate-500 line-through ml-2">199.99€</span></p>

                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Zapatillas deportivas de alta calidad con un diseño retro exclusivo. Fabricadas con materiales premium transpirables y suela ergonómica para máximo confort durante todo el día.
                        </p>

                        <button className="bg-primary text-white px-8 py-4 rounded-xl font-black text-lg hover:shadow-lg hover:shadow-primary/20 transition-all uppercase w-full sm:w-auto">
                            Comprar Ahora
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

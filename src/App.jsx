import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronLeft, ChevronRight, MessageCircle, BookOpen, Lightbulb, Home } from 'lucide-react';

// --- DATA DUMMY ---
const articleImages = [
  "https://images.unsplash.com/photo-1609599006353-e629aaab31ce?auto=format&fit=crop&q=80&w=400&h=250", // Quran
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400&h=250", // Buku & Belajar
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400&h=250", // Artistik / Watercolor vibe
  "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=400&h=250", // Tumpukan Buku
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400&h=250", // Perpustakaan
  "https://images.unsplash.com/photo-1512805147242-25b76d529b53?auto=format&fit=crop&q=80&w=400&h=250"  // Abstrak artistik
];

const dummyArticles = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Pentingnya Pendidikan Akhlak di Era Digital (Bagian ${i + 1})`,
  excerpt: `Di tengah gempuran teknologi, Pesantren Kampoeng Quran berkomitmen menjaga adab dan akhlak santri melalui pendekatan...`,
  date: `${i + 1} Okt 2023`,
  image: articleImages[i % articleImages.length]
}));

const dummyGallery = [
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800&h=600", // Anak sekolah
  "https://images.unsplash.com/photo-1609599006353-e629aaab31ce?auto=format&fit=crop&q=80&w=800&h=600", // Quran
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800&h=600", // Gedung sekolah
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800&h=600", // Wisuda/Kelulusan
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800&h=600", // Perpustakaan
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800&h=600", // Estetik buku
];

// DATA PROGRAM
const programData = [
  { 
    id: 'smp',
    title: "SMP Islam Terpadu", 
    desc: "Pendidikan menengah dengan kurikulum diknas dan diniyah terpadu.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600&h=400", 
    fullDesc: "Program SMP Islam Terpadu kami mengedepankan pembentukan karakter Islami di usia remaja. Kami memadukan kurikulum nasional dengan pemahaman agama yang mendalam. Fasilitas laboratorium, perpustakaan, dan asrama yang nyaman disiapkan untuk menunjang tumbuh kembang santri."
  },
  { 
    id: 'sma',
    title: "SMA Bina Bangsa", 
    desc: "Fokus pada penguasaan sains, teknologi, dan literasi Al-Quran.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600&h=400", 
    fullDesc: "SMA Bina Bangsa dirancang untuk mencetak lulusan yang siap bersaing di dunia global tanpa meninggalkan akar spiritualitas Islam. Program ini menawarkan penjurusan IPA dan IPS dengan pendalaman literasi Al-Quran, bahasa Arab, dan bahasa Inggris."
  },
  { 
    id: 'tahfidz',
    title: "Tahfidz Intensif", 
    desc: "Program khusus hafalan 30 Juz dengan target waktu terukur.",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaab31ce?auto=format&fit=crop&q=80&w=600&h=400", 
    fullDesc: "Program unggulan bagi santri yang memiliki azam kuat untuk menghafal Al-Quran 30 Juz. Didampingi oleh asatidz bersanad, santri akan mengikuti program mutaba'ah harian, tasmi' pekanan, hingga ujian tahfidz berjenjang untuk memastikan kualitas hafalan."
  }
];

// --- KOMPONEN UTAMA ---
export default function App() {
  const [currentView, setCurrentView] = useState('Beranda');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  // State untuk Lightbox Galeri
  const [lightboxData, setLightboxData] = useState({ isOpen: false, currentIndex: 0 });

  // Palet Warna Kustom
  const colors = {
    green: '#16a34a', // Hijau Logo
    orange: '#f59e0b', // Oranye Logo
  };

  const navItems = ['Beranda', 'Tentang', 'Program', 'Galeri', 'Testimoni', 'Artikel', 'Kontak'];

  const changeView = (view, data = null) => {
    setCurrentView(view);
    if (data) setSelectedProgram(data);
    setIsMenuOpen(false);
    window.scrollTo(0, 0); // Selalu kembali ke atas saat pindah menu SPA
  };

  // Fungsi kontrol Lightbox
  const openLightbox = (index) => {
    setLightboxData({ isOpen: true, currentIndex: index });
  };
  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };
  const nextImage = () => {
    setLightboxData(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % dummyGallery.length }));
  };
  const prevImage = () => {
    setLightboxData(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + dummyGallery.length) % dummyGallery.length }));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => changeView('Beranda')}>
              <img 
                src="https://lh3.googleusercontent.com/pw/AP1GczP_Kfkdxc3bS41NKjvCOUb3WzLL7EXJN7KkNZRrTRW7xI5kWbHCfEqTl4ID0zHV68jHAbZioXa4dytdtBqQaNYrzclMrLqZVh94NVJb0HNty5y0L6l33W_DrtGdxVr5LuCd2OQ7QZapLDPhYSQJgV1w=w435-h100-s-no-gm?authuser=0" 
                alt="Logo Kampoeng Quran" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => changeView(item)}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    currentView === item ? 'text-green-600 border-b-2 border-orange-500 pb-1' : 'text-slate-600 hover:text-green-600'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              {/* Social Icons Desktop */}
              <div className="flex items-center space-x-3 ml-4 border-l pl-4 border-slate-200">
                <a href="#" className="text-slate-400 hover:text-green-600">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-orange-500">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-red-600">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-black">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.33 6.33 6.33 6.33 0 006.33-6.33V8.42a8.05 8.05 0 004.34 1.25V6.23a4.52 4.52 0 01-2.41-.54z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-500 hover:text-green-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => changeView(item)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentView === item ? 'text-green-600 bg-green-50' : 'text-slate-600 hover:text-green-600 hover:bg-slate-50'
                  }`}
                >
                  {item}
                </button>
              ))}
              <div className="flex items-center space-x-4 px-3 py-4 mt-2 border-t border-slate-100">
                <a href="#" className="text-slate-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-slate-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="text-slate-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="text-slate-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.33 6.33 6.33 6.33 0 006.33-6.33V8.42a8.05 8.05 0 004.34 1.25V6.23a4.52 4.52 0 01-2.41-.54z"/></svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* KONTEN UTAMA - RENDER BERDASARKAN STATE */}
      <main className="flex-grow pt-20">
        {currentView === 'Beranda' && <ViewBeranda />}
        {currentView === 'Tentang' && <ViewTentang />}
        {currentView === 'Program' && <ViewProgram changeView={changeView} />}
        {currentView === 'Galeri' && <ViewGaleri onImageClick={openLightbox} />}
        {currentView === 'Testimoni' && <ViewTestimoni />}
        {currentView === 'Artikel' && <ViewArtikel />}
        {currentView === 'Kontak' && <ViewKontak />}
        {currentView === 'DetailProgram' && <ViewDetailProgram program={selectedProgram} changeView={changeView} />}
      </main>

      {/* LIGHTBOX / GALERI GESER MODAL */}
      {lightboxData.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <button 
            onClick={closeLightbox} 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={36} />
          </button>
          
          <button 
            onClick={prevImage}
            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors p-2"
          >
            <ChevronLeft size={48} />
          </button>

          <img 
            src={dummyGallery[lightboxData.currentIndex]} 
            alt={`Galeri diperbesar ${lightboxData.currentIndex + 1}`} 
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-sm"
          />

          <button 
            onClick={nextImage}
            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors p-2"
          >
            <ChevronRight size={48} />
          </button>
          
          <div className="absolute bottom-6 text-white/70 font-medium tracking-widest">
            {lightboxData.currentIndex + 1} / {dummyGallery.length}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t-4 border-green-600 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczP_Kfkdxc3bS41NKjvCOUb3WzLL7EXJN7KkNZRrTRW7xI5kWbHCfEqTl4ID0zHV68jHAbZioXa4dytdtBqQaNYrzclMrLqZVh94NVJb0HNty5y0L6l33W_DrtGdxVr5LuCd2OQ7QZapLDPhYSQJgV1w=w435-h100-s-no-gm?authuser=0" 
              alt="Logo Kampoeng Quran" 
              className="h-10 w-auto opacity-70 grayscale hover:grayscale-0 transition-all mb-4 bg-white/10 p-1 rounded"
            />
            <p className="text-sm">© {new Date().getFullYear()} Pesantren Kampoeng Quran.</p>
            <p className="text-sm mt-1">Hak Cipta Dilindungi Undang-Undang.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
            <a href="#" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Karir / Loker</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a 
        href="https://wa.me/6281214880408?text=Assalamu'alaikum,%20saya%20ingin%20bertanya%20informasi%20pendaftaran%20Pesantren%20Kampoeng%20Quran." 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}

// ==========================================
// KOMPONEN HALAMAN (VIEWS)
// ==========================================

function ViewBeranda() {
  // Kita tidak butuh lagi useEffect yang rumit, kita pakai cara bawaan yang bersih!
  
  return (
    <div className="w-full animate-fade-in">
      {/* Hero Section dengan Video Background */}
      <div className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center justify-center">
        
        {/* PERBAIKAN 1: Pindahkan src langsung ke tag <video>. React lebih suka cara ini! */}
        <video 
          src="/vidkomp.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />     
        {/* PERBAIKAN 2: Menggunakan format Tailwind v4 (bg-black/60) agar bisa transparan! */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Konten Hero */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Pesantren Pilihan Keluarga
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Mencetak generasi Qur'ani yang berakhlak mulia, mandiri, dan siap menghadapi tantangan zaman.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg border-2 border-orange-400">
            DAFTAR SEKARANG
          </button>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-stretch">
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center group">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-100">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-3">Tahfidz Bersanad</h3>
            <p className="text-slate-600">Metode hafalan intensif dengan pembimbing yang memiliki sanad keilmuan jelas.</p>
          </div>
          <div className="p-8 border border-orange-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-orange-50/50 flex flex-col items-center group">
            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-orange-200">
              <Lightbulb size={32} />
            </div>
            <h3 className="text-2xl font-bold text-orange-600 mb-3">Kurikulum Modern</h3>
            <p className="text-slate-600">Perpaduan ilmu agama mendalam dan sains teknologi terkini.</p>
          </div>
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center group">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-100">
              <Home size={32} />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-3">Asrama Nyaman</h3>
            <p className="text-slate-600">Fasilitas pendukung yang bersih, aman, dan asri untuk ketenangan belajar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewTentang() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Tentang Kampoeng Quran</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800&h=600" 
            alt="Kegiatan Santri" 
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Sejarah & Visi</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Berdiri sejak tahun [Tahun], Kampoeng Quran hadir dari sebuah cita-cita mulia untuk membumikan Al-Quran di tengah masyarakat modern. Kami percaya bahwa pendidikan tidak hanya tentang kecerdasan intelektual, tetapi juga kejernihan spiritual.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-600 p-1 rounded-full mr-3 mt-1"><ChevronRight size={16}/></span>
              <p className="text-slate-700"><strong>Visi:</strong> Menjadi pusat peradaban Islam yang mencetak cendekiawan muslim berkarakter Qur'ani.</p>
            </li>
            <li className="flex items-start">
              <span className="bg-orange-100 text-orange-600 p-1 rounded-full mr-3 mt-1"><ChevronRight size={16}/></span>
              <p className="text-slate-700"><strong>Misi:</strong> Menyelenggarakan pendidikan Islam terpadu, membina akhlakul karimah, dan mengembangkan kemandirian umat.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ViewProgram({ changeView }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Program Unggulan</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {programData.map((prog) => (
          <div key={prog.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
            {/* Bagian Header Kartu dengan Foto & Overlay Transparan */}
            <div className="h-48 relative flex items-center justify-center overflow-hidden">
              {/* Foto Latar Belakang */}
              <img 
                src={prog.image} 
                alt={prog.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              {/* Layer Hijau Tua Transparan */}
              <div className="absolute inset-0 bg-green-900/70 transition-colors duration-300 group-hover:bg-green-800/60"></div>
              {/* Tekstur Pola Arabesque */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
              
              {/* Teks Judul */}
              <h3 className="text-2xl font-bold text-white relative z-10 drop-shadow-md text-center px-4">{prog.title}</h3>
            </div>
            
            <div className="p-6 text-center relative bg-white z-20 flex-grow flex flex-col justify-between">
              <p className="text-slate-600 mb-6">{prog.desc}</p>
              <button 
                onClick={() => changeView('DetailProgram', prog)}
                className="text-orange-500 font-semibold hover:text-green-600 transition-colors mt-auto inline-block"
              >
                Pelajari Lebih Lanjut &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ViewGaleri({ onImageClick }) {
  return (
    <div className="w-full py-16 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Galeri Kegiatan</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {dummyGallery.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => onImageClick(idx)}
              className="aspect-[4/3] group overflow-hidden rounded-2xl bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 relative"
            >
              <img 
                src={img} 
                alt={`Galeri ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay halus hanya di dalam kotak gambar, tidak merusak layar penuh */}
              <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/30 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white/90 text-green-800 px-4 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center shadow-lg">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                  Perbesar
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewTestimoni() {
  return (
    <div className="w-full bg-green-50 py-16 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Suara Wali Santri</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
              <div className="absolute top-4 right-4 text-orange-200 text-6xl font-serif">"</div>
              <p className="text-slate-600 italic mb-6 relative z-10">
                "Alhamdulillah, sejak mondok di Kampoeng Quran, anak saya mengalami perubahan akhlak yang luar biasa. Kemandiriannya terbangun dan bacaan Al-Qurannya semakin tartil."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xl mr-4">
                  W
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Bapak Abdullah</h4>
                  <p className="text-sm text-slate-500">Wali Santri Angkatan {i + 5}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewArtikel() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(dummyArticles.length / itemsPerPage);

  // Potong array artikel berdasarkan halaman aktif
  const currentArticles = dummyArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Kabar & Artikel</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
        <p className="text-slate-500">Informasi terbaru seputar kegiatan pesantren dan tulisan Islami.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full border border-slate-100">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-grow flex flex-col">
              <span className="text-sm text-orange-500 font-semibold mb-2">{article.date}</span>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{article.title}</h3>
              <p className="text-slate-600 text-sm mb-4 flex-grow">{article.excerpt}</p>
              <button className="text-green-700 font-bold text-left hover:text-orange-500 transition-colors">
                Baca Selengkapnya &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginasi Render */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${currentPage === 1 ? 'text-slate-300' : 'text-green-700 hover:bg-green-50'}`}
          >
            <ChevronLeft size={24} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                currentPage === page 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-slate-300' : 'text-green-700 hover:bg-green-50'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

function ViewKontak() {
  return (
    <div className="w-full py-16 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Hubungi Kami</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Peta & Info */}
          <div>
            <div className="bg-slate-200 w-full h-64 rounded-2xl mb-8 overflow-hidden shadow-inner">
              {/* Dummy Map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126938.97341381664!2d106.7593674!3d-6.155734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta!5e0!3m2!1sen!2sid!4v1698246029177!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi"
              ></iframe>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800">Kampus Pesantren Kampoeng Quran</h3>
              <p className="text-slate-600 flex items-start">
                <span className="mr-3 mt-1 text-green-600">📍</span>
                Jl. Pendidikan No. 1, Desa Mulia, Kec. Damai, Kota Impian, 12345
              </p>
              <p className="text-slate-600 flex items-center">
                <span className="mr-3 text-green-600"><Phone size={18}/></span>
                (021) 1234-5678 / 0812-3456-7890
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Kirim Pesan</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Masukkan nama" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp</label>
                <input type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="08xx..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pesan / Pertanyaan</label>
                <textarea rows="4" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <button type="button" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewDetailProgram({ program, changeView }) {
  if (!program) return null;

  return (
    <div className="w-full animate-fade-in bg-white pb-16">
      {/* Header Detail Program */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src={program.image} 
          alt={program.title} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-green-900/80"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {program.title}
          </h1>
          <p className="text-lg md:text-xl text-orange-400 drop-shadow-md max-w-2xl mx-auto">
            {program.desc}
          </p>
        </div>
      </div>

      {/* Konten Detail Program */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <button 
          onClick={() => changeView('Program')}
          className="flex items-center text-green-700 hover:text-orange-500 font-semibold mb-8 transition-colors group"
        >
          <ChevronLeft size={20} className="mr-1 transform group-hover:-translate-x-1 transition-transform" /> 
          Kembali ke Daftar Program
        </button>

        <div className="prose prose-lg max-w-none text-slate-600">
          <p className="text-lg leading-relaxed mb-6">
            {program.fullDesc}
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Di program <strong>{program.title}</strong> ini, kami memiliki komitmen kuat untuk memastikan setiap santri mendapatkan perhatian penuh dari pengajar yang berkompeten. Metode pembelajaran didesain agar santri tidak hanya menguasai teori, namun juga mempraktikkan adab dan akhlakul karimah dalam kehidupan sehari-hari.
          </p>
          
          <div className="bg-green-50 p-6 sm:p-8 rounded-2xl border border-green-100 my-8 shadow-sm">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Kenapa Memilih Program Ini?</h3>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 font-bold">✓</span> 
                <span><strong>Kurikulum Terintegrasi:</strong> Pemaduan seimbang antara ilmu din (agama) dan sains modern.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 font-bold">✓</span> 
                <span><strong>Fasilitas Representatif:</strong> Ruang kelas nyaman, laboratorium, dan asrama yang bersih dan rapi.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 font-bold">✓</span> 
                <span><strong>Pengawasan 24 Jam:</strong> Pembinaan adab dan karakter melalui musyrif/musyrifah yang kompeten.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action Pendaftaran */}
        <div className="mt-12 text-center bg-white p-8 border border-slate-100 rounded-2xl shadow-sm">
          <h4 className="text-xl font-bold text-slate-800 mb-2">Tertarik dengan {program.title}?</h4>
          <p className="text-slate-500 mb-6">Jangan ragu untuk bertanya terkait biaya, jadwal masuk, atau kurikulum secara mendetail.</p>
          <button 
            onClick={() => changeView('Kontak')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all inline-flex items-center"
          >
            Hubungi Bagian Pendaftaran <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

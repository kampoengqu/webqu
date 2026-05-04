import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, ChevronLeft, ChevronRight, MessageCircle, 
  BookOpen, Lightbulb, Home, Download, MapPin, Mail, 
  Facebook, Instagram, Youtube, Star 
} from 'lucide-react';

// --- DATA DUMMY (FALLBACK JIKA CMS KOSONG/GAGAL LOAD) ---
const defaultHomeCards = [
  { icon: "BookOpen", title: "Tahfidz Bersanad", desc: "Metode hafalan intensif dengan pembimbing yang memiliki sanad keilmuan jelas." },
  { icon: "Lightbulb", title: "Kurikulum Modern", desc: "Perpaduan ilmu agama mendalam dan sains teknologi terkini." },
  { icon: "Home", title: "Asrama Nyaman", desc: "Fasilitas pendukung yang bersih, aman, dan asri untuk ketenangan belajar." }
];

const dummyGallery = Array.from({ length: 25 }, (_, i) => ({
  url: `https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800&h=600&sig=${i}`,
  title: `Kegiatan Pesantren ${i + 1}`,
  caption: `Deskripsi singkat untuk kegiatan pesantren ke-${i + 1} di Kampoeng Quran.`
}));

const programData = [
  { id: 'smp', title: "SMP Islam Terpadu", desc: "Pendidikan menengah dengan kurikulum diknas dan diniyah terpadu.", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600&h=400", fullDesc: "Program SMP Islam Terpadu kami mengedepankan pembentukan karakter Islami di usia remaja. Kami memadukan kurikulum nasional dengan pemahaman agama yang mendalam. Fasilitas laboratorium, perpustakaan, dan asrama yang nyaman disiapkan untuk menunjang tumbuh kembang santri.", benefits: ["Kurikulum Terintegrasi", "Fasilitas Representatif", "Pengawasan 24 Jam"] },
  { id: 'sma', title: "SMA Bina Bangsa", desc: "Fokus pada penguasaan sains, teknologi, dan literasi Al-Quran.", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600&h=400", fullDesc: "SMA Bina Bangsa dirancang untuk mencetak lulusan yang siap bersaing di dunia global tanpa meninggalkan akar spiritualitas Islam. Program ini menawarkan penjurusan IPA dan IPS dengan pendalaman literasi Al-Quran, bahasa Arab, dan bahasa Inggris.", benefits: ["Fokus Sains & Teknologi", "Literasi Al-Quran"] },
  { id: 'tahfidz', title: "Tahfidz Intensif", desc: "Program khusus hafalan 30 Juz dengan target waktu terukur.", image: "https://images.unsplash.com/photo-1609599006353-e629aaab31ce?auto=format&fit=crop&q=80&w=600&h=400", fullDesc: "Program unggulan bagi santri yang memiliki azam kuat untuk menghafal Al-Quran 30 Juz. Didampingi oleh asatidz bersanad, santri akan mengikuti program mutaba'ah harian, tasmi' pekanan, hingga ujian tahfidz berjenjang untuk memastikan kualitas hafalan.", benefits: ["Target 30 Juz", "Asatidz Bersanad"] }
];

const dummyTestimonials = [
  { id: 1, name: "Bapak Abdullah", role: "Wali Santri Angkatan 6", content: "Alhamdulillah, sejak mondok di Kampoeng Quran, anak saya mengalami perubahan akhlak yang luar biasa. Kemandiriannya terbangun dan bacaan Al-Qurannya semakin tartil.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" },
  { id: 2, name: "Ibu Siti Aminah", role: "Wali Santri Angkatan 7", content: "Lingkungan pesantren sangat kondusif untuk menghafal. Ustaz dan ustazah sangat perhatian terhadap perkembangan santri.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" },
  { id: 3, name: "Bapak Rahmat Hidayat", role: "Wali Santri Angkatan 5", content: "Program kurikulum modernnya sangat membantu anak saya bersaing di bidang akademik tanpa melupakan hafalan Qurannya.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" },
  { id: 4, name: "Ibu Fatimah Zahra", role: "Wali Santri Angkatan 8", content: "Fasilitas asrama yang bersih dan nyaman membuat kami tenang menitipkan anak kami di sini. Sangat direkomendasikan.", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" },
];

export default function App() {
  const [currentView, setCurrentView] = useState('Beranda');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, currentIndex: 0 });
  
  // STATE UNTUK MENYIMPAN DATA DARI CMS
  const [cmsData, setCmsData] = useState(null);

  const navItems = ['Beranda', 'Tentang', 'Program', 'Galeri', 'Testimoni', 'Artikel', 'Kontak'];

  // MENGAMBIL DATA CMS SAAT WEB DIMUAT & MENYIAPKAN META TAGS (DENGAN PENGECEKAN KEAMANAN SSR/VERCEL)
  useEffect(() => {
    // 1. Injeksi Dinamis Meta Tag Sosial Media
    // PENTING: Pengecekan typeof window !== 'undefined' mencegah Vercel SSR Crash (Mencegah Layar Blank!)
    if (typeof window !== 'undefined') {
        const setMetaTag = (attrName, attrValue, content) => {
          let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
          if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attrName, attrValue);
            document.head.appendChild(element);
          }
          element.setAttribute('content', content);
        };

        document.title = "Kampoeng Quran - Pesantren Pilihan Keluarga";
        setMetaTag('name', 'description', 'Kawasan pesantren dan pendidikan islam berbasis quran dengan konsep lingkungan yang asri dan kondusif. Menyediakan fasilitas belajar terpadu untuk mendukung kenyamanan santri dalam menghafal dan memahami Al-Quran.');
        setMetaTag('property', 'og:title', 'Kampoeng Quran - Pesantren Pilihan Keluarga');
        setMetaTag('property', 'og:description', 'Kawasan pesantren dan pendidikan islam berbasis quran dengan konsep lingkungan yang asri dan kondusif. Menyediakan fasilitas belajar terpadu untuk mendukung kenyamanan santri dalam menghafal dan memahami Al-Quran.');
        setMetaTag('property', 'og:image', 'https://lh3.googleusercontent.com/pw/AP1GczPRCX3LqYXjMAmbBbHo7zGYhCnrG0XY3Q8I98R7vKtSVyld05VD3fP1Z526ytfo20K2VoqzGs-Stg_SgVy8d71od0UOfLvzk8lZTJJYHlbZCHjDVO81b_rRkRYnLhKqE20iehEZRKa4inzxUdJgo1UO=w512-h512-s-no-gm?authuser=0');
        setMetaTag('property', 'og:url', 'https://webqu-peach.vercel.app/');
        setMetaTag('property', 'og:type', 'website');
    }

    // 2. Fetch Data CMS
    const fetchCmsData = async () => {
      try {
        if (typeof window !== 'undefined' && (window.location.protocol === 'blob:' || window.location.protocol === 'data:' || window.location.origin === 'null')) {
            throw new Error("Sandbox env");
        }
        const res = await fetch('/theme.json');
        if (res.ok) {
          const data = await res.json();
          setCmsData(data);
        }
      } catch (e) {
        console.log("Menggunakan data dummy default (CMS belum disetel/sedang di Sandbox)");
      }
    };
    fetchCmsData();
  }, []);

  const changeView = (view, data = null) => {
    if (view === 'Artikel') {
      window.location.href = '/blog.html';
      return;
    }
    setCurrentView(view);
    if (view === 'DetailProgram' && data) setSelectedProgram(data);
    setIsMenuOpen(false); window.scrollTo(0, 0); 
  };

  const activeGallery = cmsData?.galeri || dummyGallery;
  const openLightbox = (index) => setLightboxData({ isOpen: true, currentIndex: index });
  const closeLightbox = () => setLightboxData({ ...lightboxData, isOpen: false });
  const nextImage = () => setLightboxData(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % activeGallery.length }));
  const prevImage = () => setLightboxData(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + activeGallery.length) % activeGallery.length }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* --- INJEKSI CSS DINAMIS DARI CMS TEMA GLOBAL --- */}
      {cmsData && (
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --brand-primary: ${cmsData.primary || '#059669'};
            --brand-accent: ${cmsData.accent || '#f97316'};
            --brand-link: ${cmsData.link || '#15803d'};
            --card-hover: ${cmsData.beranda?.cardHoverColor || '#dcfce7'};
          }
          /* Menimpa warna Tailwind default */
          .text-green-700, .text-green-600, .text-green-800 { color: var(--brand-primary) !important; }
          .bg-green-600, .bg-green-500 { background-color: var(--brand-primary) !important; }
          .border-green-600 { border-color: var(--brand-primary) !important; }
          .bg-green-100 { background-color: color-mix(in srgb, var(--brand-primary) 15%, transparent) !important; }
          
          .text-orange-500, .text-orange-600, .text-orange-400 { color: var(--brand-accent) !important; }
          .bg-orange-500, .bg-orange-600 { background-color: var(--brand-accent) !important; }
          .border-orange-500, .border-orange-400 { border-color: var(--brand-accent) !important; }
          .bg-orange-100 { background-color: color-mix(in srgb, var(--brand-accent) 15%, transparent) !important; }
          
          .hover\\:text-green-600:hover { color: var(--brand-primary) !important; }
          .hover\\:text-orange-500:hover { color: var(--brand-accent) !important; }
          .hover\\:bg-orange-600:hover { background-color: color-mix(in srgb, var(--brand-accent) 85%, black) !important; }
          .hover\\:bg-green-600:hover { background-color: color-mix(in srgb, var(--brand-primary) 85%, black) !important; }
          
          /* Dinamis Hover Card Fitur Beranda */
          .group:hover .dynamic-card-hover { background-color: var(--card-hover) !important; }
        `}} />
      )}

      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => changeView('Beranda')}>
              <img src="https://lh3.googleusercontent.com/pw/AP1GczP_Kfkdxc3bS41NKjvCOUb3WzLL7EXJN7KkNZRrTRW7xI5kWbHCfEqTl4ID0zHV68jHAbZioXa4dytdtBqQaNYrzclMrLqZVh94NVJb0HNty5y0L6l33W_DrtGdxVr5LuCd2OQ7QZapLDPhYSQJgV1w=w435-h100-s-no-gm?authuser=0" alt="Logo" className="h-12 w-auto object-contain" />
            </div>
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item) => (
                <button key={item} onClick={() => changeView(item)} className={`text-sm font-semibold transition-colors duration-200 ${currentView === item ? 'text-green-600 border-b-2 border-orange-500 pb-1' : 'text-slate-600 hover:text-green-600'}`}>{item}</button>
              ))}
              <div className="flex items-center space-x-3 ml-4 border-l pl-4 border-slate-200">
                 <div className="flex space-x-3 text-slate-400">
                    <Facebook size={18} className="cursor-pointer hover:text-orange-500" />
                    <Instagram size={18} className="cursor-pointer hover:text-orange-500" />
                    <Youtube size={18} className="cursor-pointer hover:text-orange-500" />
                 </div>
              </div>
            </div>
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 hover:text-green-600 focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button key={item} onClick={() => changeView(item)} className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentView === item ? 'text-green-600 bg-green-50' : 'text-slate-600 hover:text-green-600 hover:bg-slate-50'}`}>{item}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-20">
        {currentView === 'Beranda' && <ViewBeranda cmsData={cmsData} changeView={changeView} />}
        {currentView === 'Tentang' && <ViewTentang />}
        {currentView === 'Program' && <ViewProgram cmsData={cmsData} changeView={changeView} />}
        {currentView === 'Galeri' && <ViewGaleri activeGallery={activeGallery} onImageClick={openLightbox} />}
        {currentView === 'Testimoni' && <ViewTestimoni cmsData={cmsData} />}
        {currentView === 'Kontak' && <ViewKontak />}
        {currentView === 'DetailProgram' && <ViewDetailProgram program={selectedProgram} changeView={changeView} cmsData={cmsData} />}
      </main>

      {/* Lightbox Galeri */}
      {lightboxData.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"><X size={36} /></button>
          <button onClick={prevImage} className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors p-2 z-50"><ChevronLeft size={48} /></button>
          <div className="relative flex flex-col items-center justify-center max-h-[80vh] w-full px-16">
            <img src={activeGallery[lightboxData.currentIndex].url} alt={activeGallery[lightboxData.currentIndex].title} className="max-h-[65vh] max-w-full object-contain shadow-2xl rounded-sm mb-6" />
          </div>
          <button onClick={nextImage} className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors p-2 z-50"><ChevronRight size={48} /></button>
          <div className="absolute bottom-0 left-0 right-0 pt-20 pb-8 px-4 bg-gradient-to-t from-black via-black/80 to-transparent text-center">
            <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-md">{activeGallery[lightboxData.currentIndex].title}</h3>
            <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto mb-3">{activeGallery[lightboxData.currentIndex].caption}</p>
            <div className="text-white/40 font-medium tracking-widest text-sm mt-2">{lightboxData.currentIndex + 1} / {activeGallery.length}</div>
          </div>
        </div>
      )}

      <footer className="bg-slate-900 text-slate-400 py-10 border-t-4 border-green-600 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <img src="https://lh3.googleusercontent.com/pw/AP1GczP_Kfkdxc3bS41NKjvCOUb3WzLL7EXJN7KkNZRrTRW7xI5kWbHCfEqTl4ID0zHV68jHAbZioXa4dytdtBqQaNYrzclMrLqZVh94NVJb0HNty5y0L6l33W_DrtGdxVr5LuCd2OQ7QZapLDPhYSQJgV1w=w435-h100-s-no-gm?authuser=0" alt="Logo Kampoeng Quran" className="h-10 w-auto opacity-70 grayscale hover:grayscale-0 transition-all mb-4 bg-white/10 p-1 rounded" />
            <p className="text-sm">© {new Date().getFullYear()} Pesantren Kampoeng Quran.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
            <a href="#" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
      <a href="https://wa.me/6281214880408?text=Assalamu'alaikum..." target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 z-50 flex items-center justify-center"><MessageCircle size={28} /></a>
    </div>
  );
}

function ViewBeranda({ cmsData, changeView }) {
  const heroLink = cmsData?.beranda?.daftarLink || "#";
  const featureCards = cmsData?.beranda?.cards || defaultHomeCards;

  // Memetakan string ikon dari CMS ke Komponen Ikon secara aman
  const DynamicIconsMap = { BookOpen, Lightbulb, Home, Star };

  const handleDaftarClick = () => {
      if (heroLink.startsWith('http')) window.open(heroLink, '_blank');
      else changeView('Kontak');
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center justify-center">
        <video src="/vidkomp.mp4" autoPlay loop muted playsInline onCanPlay={(e) => e.target.play()} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">Pesantren Pilihan Keluarga</h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto drop-shadow-md">Mencetak generasi Qur'ani yang berakhlak mulia, mandiri, dan siap menghadapi tantangan zaman.</p>
          <button onClick={handleDaftarClick} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg border-2 border-orange-400">DAFTAR SEKARANG</button>
        </div>
      </div>
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-stretch">
          {featureCards.map((item, i) => {
            const IconComponent = DynamicIconsMap[item.icon] || Star;
            return (
              <div key={i} className="p-8 border border-slate-100 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center group dynamic-card-hover">
                 <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-green-100 text-green-600">
                    <IconComponent size={32} />
                 </div>
                 <h3 className="text-2xl font-bold mb-3 text-green-700">{item.title}</h3>
                 <p className="text-slate-600 group-hover:text-slate-800">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ViewTentang() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Tentang Kampoeng Quran</h2><div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <img src="https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800&h=600" alt="Santri" className="rounded-2xl shadow-xl w-full" />
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Sejarah & Visi</h3>
          <p className="text-slate-600 leading-relaxed mb-6">Berdiri sejak tahun [Tahun], Kampoeng Quran hadir dari sebuah cita-cita mulia untuk membumikan Al-Quran di tengah masyarakat modern.</p>
          <ul className="space-y-4">
            <li className="flex items-start"><span className="bg-green-100 text-green-600 p-1 rounded-full mr-3 mt-1"><ChevronRight size={16}/></span><p className="text-slate-700"><strong>Visi:</strong> Menjadi pusat peradaban Islam yang mencetak cendekiawan muslim berkarakter Qur'ani.</p></li>
            <li className="flex items-start"><span className="bg-orange-100 text-orange-600 p-1 rounded-full mr-3 mt-1"><ChevronRight size={16}/></span><p className="text-slate-700"><strong>Misi:</strong> Menyelenggarakan pendidikan Islam terpadu, membina akhlakul karimah, dan mengembangkan kemandirian umat.</p></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ViewProgram({ cmsData, changeView }) {
  const programs = cmsData?.programs?.list || programData;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Program Unggulan</h2><div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {programs.map((prog) => (
          <div key={prog.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
            <div className="h-48 relative flex items-center justify-center overflow-hidden">
              <img src={prog.image} alt={prog.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-green-900/70 transition-colors duration-300 group-hover:bg-green-800/60"></div>
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
              <h3 className="text-2xl font-bold text-white relative z-10 drop-shadow-md text-center px-4">{prog.title}</h3>
            </div>
            <div className="p-6 text-center relative bg-white z-20 flex-grow flex flex-col justify-between">
              <p className="text-slate-600 mb-6">{prog.desc}</p>
              <button onClick={() => changeView('DetailProgram', prog)} className="text-orange-500 font-semibold hover:text-green-600 transition-colors mt-auto inline-block">Pelajari Lebih Lanjut &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ViewGaleri({ activeGallery, onImageClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(activeGallery.length / itemsPerPage);
  const currentImages = activeGallery.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full py-16 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Galeri Kegiatan</h2><div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {currentImages.map((item, idx) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + idx;
            return (
              <div key={globalIndex} onClick={() => onImageClick(globalIndex)} className="aspect-[4/3] group overflow-hidden rounded-2xl bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 relative">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-base md:text-lg drop-shadow-md">{item.title}</h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/95 text-green-800 px-4 py-2 rounded-full font-bold flex items-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">Perbesar</div>
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'text-slate-300' : 'text-green-700 hover:bg-green-50'}`}><ChevronLeft size={24} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-lg font-bold transition-colors ${currentPage === page ? 'bg-green-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-slate-300' : 'text-green-700 hover:bg-green-50'}`}><ChevronRight size={24} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function ViewTestimoni({ cmsData }) {
  const testimonials = cmsData?.testimoni?.testimonials || dummyTestimonials;

  return (
    <div className="w-full bg-green-50 py-16 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Suara Wali Santri</h2><div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => (
            <div key={item.id || idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative flex flex-col">
              <div className="absolute top-4 right-4 text-orange-200 text-6xl font-serif">"</div>
              <p className="text-slate-600 italic mb-6 relative z-10 flex-grow">"{item.content}"</p>
              <div className="flex items-center mt-auto">
                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-200 shadow-sm" />
                <div><h4 className="font-bold text-slate-800">{item.name}</h4><p className="text-sm text-slate-500">{item.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewKontak() {
  const [showNotif, setShowNotif] = useState(false);
  const handleKirimEmail = (e) => {
    e.preventDefault(); const form = e.target;
    window.location.href = `mailto:kampoengqurancendekia@gmail.com?subject=${encodeURIComponent(`Pertanyaan Web: ${form.nama.value}`)}&body=${encodeURIComponent(`Nama Lengkap: ${form.nama.value}\nNomor WhatsApp: ${form.whatsapp.value}\n\nIsi Pesan:\n${form.pesan.value}`)}`;
    setShowNotif(true); form.reset(); setTimeout(() => setShowNotif(false), 6000);
  };

  return (
    <div className="w-full py-16 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Hubungi Kami</h2><div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div></div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-slate-200 w-full h-80 rounded-2xl mb-8 overflow-hidden shadow-inner"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2764320553165!2d107.56505519999999!3d-6.8574344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e41b035ceedd%3A0xd1f374b4afdb93f0!2sPesantren%20Tahfidz%20Kampoeng%20Qur'an%20Cendekia!5e0!3m2!1sid!2sid!4v1777771661849!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Peta Lokasi Kampoeng Quran"></iframe></div>
            <div className="space-y-6">
              <div><h3 className="text-lg font-bold text-slate-800 flex items-center mb-2"><MapPin size={20} className="text-green-600 mr-2" /> Alamat Kampus</h3><p className="text-slate-600 ml-7 leading-relaxed">Perum. Lembah Hijau, Jl. Cihanjuang Jl. Cibaligo 5, Cihanjuang, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559</p></div>
              <div><h3 className="text-lg font-bold text-slate-800 flex items-center mb-2"><Phone size={20} className="text-green-600 mr-2" /> Kontak & WhatsApp</h3><p className="text-slate-600 ml-7 font-semibold">0812-1488-0408</p></div>
              <div><h3 className="text-lg font-bold text-slate-800 flex items-center mb-2"><Mail size={20} className="text-green-600 mr-2" /> Email</h3><p className="text-slate-600 ml-7">kampoengqurancendekia@gmail.com</p></div>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Kirim Pesan</h3>
            <form onSubmit={handleKirimEmail} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label><input type="text" name="nama" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Masukkan nama" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp</label><input type="tel" name="whatsapp" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="08xx..." /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Pesan / Pertanyaan</label><textarea rows="4" name="pesan" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Tulis pesan Anda di sini..."></textarea></div>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors flex justify-center items-center"><Mail size={18} className="mr-2"/> Kirim Pesan via Email</button>
            </form>
            {showNotif && <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg animate-fade-in flex items-start"><div className="text-green-600 mr-3 mt-0.5"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><h4 className="text-green-800 font-bold text-sm">Terima kasih sudah menghubungi kami!</h4><p className="text-green-700 text-sm mt-1">Pesan Anda sedang dialihkan. Silakan tekan tombol "Kirim" pada aplikasi email Anda yang baru saja terbuka.</p></div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewDetailProgram({ program, changeView, cmsData }) {
  if (!program) return null;

  const registerLink = cmsData?.programs?.registerLink || "https://wa.me/6281214880408";
  const brochureLink = cmsData?.programs?.brochureLink || "#";

  const handleDaftarClick = () => window.open(registerLink, '_blank');
  const handleBrosurClick = () => {
     if(brochureLink === "#") alert("Link brosur belum disematkan.");
     else window.open(brochureLink, '_blank');
  };

  return (
    <div className="w-full animate-fade-in bg-white pb-16">
      <div className="relative w-full h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
        <img src={program.image} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-green-900/80"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{program.title}</h1>
          <p className="text-lg md:text-xl text-orange-400 drop-shadow-md max-w-2xl mx-auto">{program.desc}</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <button onClick={() => changeView('Program')} className="flex items-center text-green-700 hover:text-orange-500 font-semibold mb-8 transition-colors group"><ChevronLeft size={20} className="mr-1 transform group-hover:-translate-x-1 transition-transform" /> Kembali ke Daftar Program</button>
        <div className="prose prose-lg max-w-none text-slate-600">
          <p className="text-lg leading-relaxed mb-6">{program.fullDesc}</p>
          <div className="bg-green-50 p-6 sm:p-8 rounded-2xl border border-green-100 my-8 shadow-sm">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Kenapa Memilih Program Ini?</h3>
            <ul className="space-y-4 list-none pl-0">
              {program.benefits && program.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start"><span className="text-orange-500 mr-3 mt-1 font-bold">✓</span><span>{benefit}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center bg-white p-8 border border-slate-100 rounded-2xl shadow-sm">
          <h4 className="text-xl font-bold text-slate-800 mb-2">Tertarik dengan {program.title}?</h4>
          <p className="text-slate-500 mb-6">Jangan ragu untuk bertanya terkait biaya, jadwal masuk, atau kurikulum secara mendetail.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={handleDaftarClick} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all inline-flex items-center justify-center w-full sm:w-auto">Hubungi Bagian Pendaftaran <ChevronRight size={18} className="ml-1" /></button>
            <button onClick={handleBrosurClick} className="bg-white hover:bg-green-50 text-green-700 border-2 border-green-600 font-bold py-3 px-8 rounded-full shadow-sm transition-all inline-flex items-center justify-center w-full sm:w-auto"><Download size={18} className="mr-2" /> Download Brosur</button>
          </div>
        </div>
      </div>
    </div>
  );
}
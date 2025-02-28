import Sidebar from '../components/Sidebar';
import { Header } from '../components/Header';
import { SearchForm } from '../components/SearchForm';

export default function HomeView() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="min-h-screen bg-gray-100 py-10 lg:bg-[url(/bg.svg)] bg-no-repeat bg-right-top lg:bg-[length:50%]">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="lg:w-1/2 px-6 md:p-6 lg:p-0 space-y-6">
            <h1 className="text-6xl font-black leading-tight">
              Conéctate con el mundo en un solo <span className="text-cyan-400">enlace</span>
            </h1>

            <p className="text-slate-800 text-xl leading-relaxed">
              Más de <span className="font-bold text-cyan-600">200,000 personas</span> ya comparten
              sus redes en un solo lugar. Une tu{' '}
              <span className="font-semibold">TikTok, Instagram, Facebook, YouTube, GitHub</span> y
              más, en un enlace único y profesional.
            </p>

            <p className="text-slate-800 text-xl">
              📌 Ingresa tu <span className="font-semibold text-cyan-600">nickname</span> y verifica
              su disponibilidad:
            </p>

            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
}

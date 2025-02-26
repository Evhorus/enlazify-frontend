import { Header } from '../components/Header';
import { SearchForm } from '../components/SearchForm';

export default function HomeView() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 py-10 lg:bg-[url(/bg.svg)] bg-no-repeat bg-right-top lg:bg-[length:50%]">
        <div className="max-w-7xl mx-auto mt-10">
          <div
            className="lg:w-1/2 px-10 lg:p-0 space-y-6
          6"
          >
            <h1 className="text-6xl font-black">
              Todas tu <span className="text-cyan-400">Redes Sociales </span> en
              un enlace
            </h1>

            <p className="text-slate-800 text-xl">
              Únete a más de 200mil personas compartiendo sus redes
              sociales,TikTok, Facebook, Instagram, You Tube, Github y más.
            </p>

            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
}

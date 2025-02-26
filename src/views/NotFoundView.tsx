
export default function NotFoundView() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">Página no encontrada</p>
      <p className="text-gray-500 mt-2">
        Lo sentimos, la página que buscas no existe.
      </p>
      <a
        href="/"
        className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Volver al inicio
      </a>
    </div>
  );
}

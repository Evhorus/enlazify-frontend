import { Outlet } from 'react-router';

export default function HandleLayout() {
  return (
    <div>
      <header>Aca va el header</header>
      <div className="min-h-screen items-center">
        <Outlet />
      </div>
    </div>
  );
}

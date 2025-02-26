import { BrowserRouter, Routes, Route } from 'react-router';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';

import ProfileView from './views/ProfileView';
import SocialMediaLinksView from './views/SocialMediaLinksView';
import HandleView from './views/HandleView';
import HandleLayout from './layouts/HandleLayout';
import NotFoundView from './views/NotFoundView';
import HomeView from './views/HomeView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
        </Route>

        <Route path="/admin" element={<AppLayout />}>
          <Route index element={<SocialMediaLinksView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>

        <Route path="/:handle" element={<HandleLayout />}>
          <Route index element={<HandleView />} />
        </Route>

        <Route path="/" element={<HomeView />} />

        <Route path="/404" element={<AppLayout />}>
          <Route index element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

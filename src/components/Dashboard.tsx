import { Link, Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { NavigationTabsDesktop } from './NavigationTabs';
import { NavigationTabsMobile } from './NavigationTabsMobile';
import { IoBookOutline, IoPersonOutline } from 'react-icons/io5';
import { SocialNetwork, User } from '../types';
import { useEffect, useState } from 'react';
import { SortableLinkItem } from './SortableLinkItem';
import { useQueryClient } from '@tanstack/react-query';
import { Header } from './Header';
const tabs = [
  { name: 'Links', href: '/admin', icon: IoBookOutline },
  { name: 'Mi Perfil', href: '/admin/profile', icon: IoPersonOutline },
];

type LinkTreeProps = {
  data: User;
};

export const Dashboard = ({ data }: LinkTreeProps) => {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    );
  }, [data.links]);

  const queryClient = useQueryClient();
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const newIndex = enabledLinks.findIndex((link) => link.id === over.id);

      const order = arrayMove(enabledLinks, prevIndex, newIndex);

      const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter(
        (item: SocialNetwork) => !item.enabled
      );

      setEnabledLinks(order);

      const links = [...order, ...disabledLinks];

      queryClient.setQueryData(['user'], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links),
        };
      });
    }
  };

  return (
    <>
      <Header />

      <div className="bg-gray-100  min-h-screen py-10">
        {/* Contenido principal */}
        <main className="max-w-7xl mx-auto">
          <NavigationTabsDesktop tabs={tabs} />
          <div className="flex justify-center lg:justify-end">
            <Link
              className="font-bold text-center lg:text-right text-slate-800 text-2xl"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil: /{data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-4xl text-center font-black text-white">
                {data.handle}
              </p>

              {data.image && (
                <img
                  className="mx-auto max-w-[250px] border-4 border-white rounded-full"
                  src={data.image}
                  alt="Imagen profile"
                />
              )}
              <p className="text-center text-lg font-black text-white">
                {data.description}
              </p>

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="mt-20 flex flex-col gap-5">
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link: SocialNetwork) => (
                      <SortableLinkItem key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
              {/* 
              <div className="mt-20 flex flex-col gap-5">
                {enabledLinks.map((link: SocialNetwork) => (
                  <DevTree key={link.name} link={link} />
                ))}
              </div> */}
            </div>
          </div>
        </main>

        <NavigationTabsMobile tabs={tabs} />

        {/* Menú de navegación fijo en la parte inferior */}
      </div>

      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </>
  );
};

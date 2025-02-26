import { useEffect, useState } from 'react';
import { social } from '../data/social';

import { SocialMediaInput } from '../components/SocialMediaInput';
import { SelectedSocialNetwork, SocialNetwork, User } from '../types';
import { isValidUrl } from '../utils';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/enlazify.api';

export default function SocialMediaLinksView() {
  const [socialLinks, setSocialLinks] =
    useState<SelectedSocialNetwork[]>(social);
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(['user'])!;

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Actualizado con éxito');
    },
  });

  useEffect(() => {
    const updatedData = socialLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SelectedSocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setSocialLinks(updatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = socialLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setSocialLinks(updatedLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = socialLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error('La URL no es válida');
        }
      }
      return link;
    });
    setSocialLinks(updatedLinks);

    let updatedItems: SocialNetwork[] = [];

    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );

    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;
      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetwork
      );

      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false,
          };
        } else if (
          link.id > indexToUpdate &&
          indexToUpdate !== 0 &&
          link.id === 1
        ) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    // Almacenar  en la base de datos
    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };

  return (
    <>
      <div className="space-y-5">
        {socialLinks.map((item) => (
          <SocialMediaInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          onClick={() => mutate(queryClient.getQueryData(['user'])!)}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  );
}

import { UserHandle } from '../types';
import { SocialNetwork } from '../types/index';

type HandleDataProps = {
  data: UserHandle;
};
export const HandleData = ({ data }: HandleDataProps) => {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  );

  return (
    <div className="space-y-5 ">
      <p className="text-3xl text-center font-black">{data.name}</p>
      {data.image && (
        <img
          src={data.image}
          alt="profile"
          className="max-w-[250px] mx-auto rounded-full"
        />
      )}
      <p className="text-lg text-center font-bold">{data.description}</p>
      <div className="mt-20 flex flex-col gap-5">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.name}
              className="px-5 py-2 flex items-center gap-5 rounded-lg"
              href={link.url}
              target="_blank"
              rel="noreferrer noopenner"
            >
              <img
                className="w-12"
                src={`/social/icon_${link.name}.svg`}
                alt="Red social"
              />
              <p className="capitalize"> Visita mi: {link.name}</p>
            </a>
          ))
        ) : (
          <p>No hay enlaces en este perfil</p>
        )}
      </div>
    </div>
  );
};

import slugify from 'react-slugify';
import { ErrorMessage } from './ErrorMessage';
import { Link } from 'react-router';
import { searchByHandle } from '../api/enlazify.api';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Button } from './ui/button';
import { IoReloadCircleOutline } from 'react-icons/io5';
import { useEffect } from 'react';

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: '',
    },
  });

  // const mutationSearchByHandle = useMutation({
  //   mutationFn: async (handle: string) => {
  //     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula un retraso de 2 segundos
  //     return searchByHandle(handle);
  //   },
  // });

  const mutationSearchByHandle = useMutation({
    mutationFn: searchByHandle,
  });

  const handle = watch('handle');

  useEffect(() => {
    if (!handle) {
      mutationSearchByHandle.reset();
    }
  }, [handle, mutationSearchByHandle]);

  const handleSearch = () => {
    const slug = slugify(handle);
    mutationSearchByHandle.mutate(slug);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="space-y-4">
      <div className="relative flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-gray-400 w-full overflow-hidden">
        <label htmlFor="handle" className="text-gray-600 whitespace-nowrap">
          enlazify.com/
        </label>
        <input
          type="text"
          id="handle"
          className="flex-1 bg-white text-black placeholder-gray-400 border-none p-2 outline-none focus:ring-0 truncate"
          placeholder="Ejemplo: tu_nombre, empresa_xyz, creador123"
          {...register('handle', {
            required: 'Por favor, ingresa un nombre de usuario.',
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      <div className="space-y-2">
        {mutationSearchByHandle.error && (
          <p className="text-center font-semibold text-lg text-red-600">
            ❌ {mutationSearchByHandle.error.message}
          </p>
        )}

        {mutationSearchByHandle.data?.message && handle && (
          <>
            <p className="font-semibold text-green-600 text-center">
              ✅ ¡Está disponible! Asegura tu nombre antes de que alguien más lo haga.
            </p>

            <Button
              asChild
              size={'lg'}
              className="w-full font-black cursor-pointer bg-purple-600 uppercase text-lg hover:bg-purple-700"
            >
              <Link to="/auth/register" state={{ handle: slugify(handle) }}>
                Crear mi perfil ahora 🚀
              </Link>
            </Button>
          </>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full font-black cursor-pointer bg-gray-600 uppercase text-lg hover:bg-gray-700 flex items-center justify-center gap-2"
        disabled={mutationSearchByHandle.isPending}
      >
        {mutationSearchByHandle.isPending ? (
          <>
            <IoReloadCircleOutline size={20} className="animate-spin" />
            Buscando...
          </>
        ) : (
          'Buscar disponibilidad'
        )}
      </Button>
    </form>
  );
};

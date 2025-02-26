import { useForm } from 'react-hook-form';
import slugify from 'react-slugify';
import { ErrorMessage } from './ErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { searchByHandle } from '../api/enlazify.api';
import { Link } from 'react-router';

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

  const mutationSearchByHandle = useMutation({
    mutationFn: searchByHandle,
  });

  const handle = watch('handle');

  const handleSearch = () => {
    const slug = slugify(handle);

    console.log(slug);
    mutationSearchByHandle.mutate(slug);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label htmlFor="handle">enlazify.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register('handle', {
            required: 'Un Nombre de Usuario es obligatorio',
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="mt-10">
        {mutationSearchByHandle.isPending && (
          <p className="text-center">Buscando...</p>
        )}
        {mutationSearchByHandle.error && (
          <p className="text-center text-red-600">
            {mutationSearchByHandle.error.message}
          </p>
        )}

        {mutationSearchByHandle.data && (
          <p className="text-center text-green-600">
            {mutationSearchByHandle.data.message} ir a{' '}
            <Link
              className="font-black"
              to="/auth/register"
              state={{ handle: slugify(handle) }}
            >
              Registrarse
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Obtener mi LinkTree"
      />
    </form>
  );
};

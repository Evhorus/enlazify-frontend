import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import api from '../config/axios';
import type { RegisterForm } from '../types';
import { ErrorMessage } from '../components/ErrorMessage';
import { toast } from 'react-toastify';

export default function RegisterView() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialValues: RegisterForm = {
    name: '',
    handle: location.state?.handle || '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const password = watch('password');

  const habdleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post('/auth/register', formData);
      reset();
      toast.success(data.message);
      navigate('/auth/login');
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return toast.error(error.response.data);
      }
      toast.error('Ha ocurrido un error');
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-10">
      <div>
        <div className="max-w-[100px] mx-auto pb-10">
          <img src="/social/icon_facebook.svg" alt="" />
        </div>

        <h1 className="text-3xl font-bold md:text-4xl text-center pb-10">
          Crear cuenta
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(habdleRegister)}
        className="container  mx-auto flex flex-col gap-4 text-gray-600"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            className="p-3 bg-gray-100 rounded-lg"
            type="text"
            placeholder="Tu nombre"
            {...register('name', {
              required: 'El nombre es requerido',
            })}
          />

          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="handle">Handle</label>
          <input
            id="handle"
            className="p-3 bg-gray-100 rounded-lg"
            type="text"
            placeholder="Nombre de usuario"
            {...register('handle', {
              required: 'El handle es requerido',
            })}
          />

          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            className="p-3 bg-gray-100 rounded-lg"
            type="email"
            placeholder="Email de registro"
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />

          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            className="p-3 bg-gray-100 rounded-lg"
            type="password"
            placeholder="Contraseña de registro"
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
          />

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Repetir contraseña</label>
          <input
            id="confirmPassword"
            className="p-3 bg-gray-100 rounded-lg"
            type="password"
            placeholder="Repite tu contraseña de registro"
            {...register('confirmPassword', {
              required: 'La contraseña es requerida',
              validate: (value) =>
                value === password || 'Las contraseñas no son iguales',
            })}
          />

          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white  text-lg py-2 rounded-full font-semibold cursor-pointer mt-6 hover:bg-blue-600"
        >
          Crear cuenta
        </button>

        <div>
          <p className="text-center">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/auth/login" className="text-blue-500">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

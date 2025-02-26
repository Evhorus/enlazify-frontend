import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoginForm } from '../types';
import api from '../config/axios';
import { useAuthStore } from '../stores/authStore';

export default function LoginView() {
  const setAuthToken = useAuthStore((store) => store.setAuthToken);
  const navigate = useNavigate();
  const initialValues: LoginForm = {
    email: '',
    password: '',
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post('/auth/login', formData);
      setAuthToken(data.token);
      reset();
      toast.success(data.message);
      navigate('/admin');
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Ha ocurrido un error');
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center px-4">
      <div className="max-w-[200px] mx-auto pb-10">
        <img src="/enlazizy-logo.svg" alt="" className="w-full" />
        <div></div>
      </div>

      <h1 className="text-3xl font-bold md:text-4xl text-center pb-10">
        Iniciar sesión
      </h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="container  mx-auto flex flex-col gap-4 text-gray-600"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            className="p-3 bg-gray-100 rounded-lg"
            type="email"
            placeholder="Ingresa tu email"
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
            placeholder="Ingresa tu contraseña"
            {...register('password', {
              required: 'La contraseña es requerida',
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <button className="bg-blue-500 text-white  text-lg py-2 rounded-full font-semibold cursor-pointer hover:bg-blue-600">
          Iniciar sesión
        </button>
        <div>
          <p className="text-center">
            ¿No tienes una cuenta?{' '}
            <Link to="/auth/register" className="text-blue-500">
              Registrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

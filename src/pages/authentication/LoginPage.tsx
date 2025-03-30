import { Link } from "react-router-dom";
import { loginBackground, logo } from "../../assets/images";
import { Button, InputField } from "../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../zod/authentication/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUserThunk } from "../../store/thunks/authenticationThunks";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getLoggedUserThunk } from "../../store/thunks/userThunks";
import useRoleRedirect from "../../hooks/useRoleRedirect";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  const { loading, message } = useSelector(
    (state: RootState) => state.authentication
  );

  const onSubmit = (data: any) => {
    dispatch(loginUserThunk(data)).then((_) => dispatch(getLoggedUserThunk()));
  };

  useEffect(() => {
    if (message.login) {
      toast.info(message.login);
    }
  }, [message.login]);

  useRoleRedirect();

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="container flex items-center justify-center h-full p-5 mx-auto text-black lg:p-10">
        <div className="flex w-full overflow-hidden bg-white rounded-xl">
          {/* Image Container */}
          <div className="relative hidden w-2/3 xl:flex">
            <img
              src={loginBackground}
              alt="loginBackground"
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>

          {/* Login Form */}
          <form
            className="flex flex-col w-full p-5 xl:w-1/3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center space-x-3">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <h3 className="text-2xl font-bold">Travel</h3>
            </div>
            <p className="mt-4 mb-2 text-lg font-bold">
              Explore the World with Us!
            </p>
            <p className="text-base mb-2">
              Log in to plan your next adventure with ease
            </p>

            <InputField
              name="email"
              title="Email"
              placeholder="Enter your email"
              type="text"
              register={register}
              error={errors.email?.message}
            />

            <InputField
              name="password"
              title="Password"
              placeholder="Enter your password"
              type="password"
              register={register}
              error={errors.password?.message}
            />

            <Button
              name="Sign In"
              className="font-bold bg-blue-600 disabled:bg-blue-400 hover:bg-blue-700"
              loading={loading.login}
              onClick={() => {}}
            />

            <div className="flex flex-col items-center justify-center gap-2 mt-6 font-medium text-center lg:flex-row">
              <p>Don't have an account?</p>
              <Link
                to="/register"
                className="text-blue-500 cursor-pointer underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

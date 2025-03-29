import { Link, useNavigate } from "react-router-dom";
import { logo, registerBackground } from "../../assets/images";
import { Button, InputField } from "../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUserThunk } from "../../store/thunks/authenticationThunks";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { registerSchema } from "../../zod/authentication/registerSchema";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const dispacth = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { loading, message } = useSelector(
    (state: RootState) => state.authentication
  );

  const onSubmit = (data: any) => {
    dispacth(registerUserThunk({ ...data, role: "user" })).then((_) => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    });
  };

  useEffect(() => {
    if (message.register) {
      toast.info(message.register);
    }
  }, [message.register]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="container flex items-center justify-center h-full p-5 mx-auto text-black lg:p-10">
        <div className="flex w-full overflow-hidden bg-white rounded-xl">
          {/* Image Container */}
          <div className="relative hidden w-2/3 xl:flex">
            <img
              src={registerBackground}
              alt="registerBackground"
              className="object-cover w-full h-full"
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
              Join Our Travel Community
            </p>
            <p className="text-base mb-2">
              Sign up to unlock exclusive deals and personalized travel
              experiences
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
              name="name"
              title="Name"
              placeholder="Enter your name"
              type="text"
              register={register}
              error={errors.name?.message}
            />

            <InputField
              name="password"
              title="Password"
              placeholder="Enter your password"
              type="password"
              register={register}
              error={errors.password?.message}
            />

            <InputField
              name="passwordRepeat"
              title="Confirmation Password"
              placeholder="Enter your confirmation password"
              type="password"
              register={register}
              error={errors.passwordRepeat?.message}
            />

            <InputField
              name="phoneNumber"
              title="Phone Number"
              placeholder="Enter your phone number"
              type="number"
              register={register}
              error={errors.phoneNumber?.message}
            />

            <Button
              name="Sign Up"
              className="font-bold bg-blue-600 disabled:bg-blue-400 hover:bg-blue-700"
              loading={loading.register}
              onClick={() => {}}
            />

            <div className="flex flex-col items-center justify-center gap-2 mt-6 font-medium text-center lg:flex-row">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="text-blue-500 cursor-pointer underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import { ROUTES } from "../constants/routes";
import useAuth from "../hooks/useAuth";
import { destinationForRole } from "../utils/authDestination";

const Login = () => {
  const { loginUser, googleLogin, resetPassword } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm();

  // Watch email input to use for password resetting
  const emailValue = watch("email");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { dbUser } = await loginUser(data.email, data.password);
      toast.success("Welcome back!");
      navigate(destinationForRole(dbUser.role,location.state),{replace:true});
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { dbUser } = await googleLogin();
      toast.success("Logged in successfully.");
      navigate(destinationForRole(dbUser.role,location.state),{replace:true});
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!emailValue) {
      toast.error("Please enter your email address first.");
      setFocus("email");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(emailValue);
      toast.success("Password reset link sent to your email!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Kotha</title>
      </Helmet>

      <section className="min-h-screen bg-base-100 pt-36 pb-20">
        <div className="container-x">
          <div className="mx-auto max-w-md rounded-[32px] border border-base-300 bg-white p-10 shadow-[0_20px_60px_rgba(63,46,51,.08)]">
            <div className="mb-10 text-center">
              <h1 className="heading text-5xl text-primary">Welcome Back</h1>
              <p className="mt-3 text-neutral/70">
                Login to continue shopping at Kotha.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block font-medium">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="input input-bordered w-full rounded-xl"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <p className="mt-1 text-sm text-error">
                  {errors.email?.message}
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="input input-bordered w-full rounded-xl pr-14"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-neutral/50 hover:text-neutral transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-sm text-error">
                  {errors.password?.message}
                </p>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="label cursor-pointer gap-2 select-none">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm rounded-md"
                  />
                  <span className="label-text font-medium text-neutral/80">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="text-primary font-semibold hover:underline text-sm disabled:opacity-50"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                className="h-12 w-full tracking-wide text-base"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="divider my-6 text-neutral/30 text-sm">OR</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn w-full h-12 rounded-xl bg-white border-base-300 hover:bg-base-200 normal-case font-medium text-neutral shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <p className="mt-8 text-center text-neutral/80">
              Don't have an account?{" "}
              <Link
                to={ROUTES.REGISTER}
                className="font-semibold text-primary hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import useAuth from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const { createUser, updateUserProfile, refreshSession } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const from = location.state || ROUTES.HOME;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const result = await createUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
      });
      await refreshSession(result.user);

      toast.success("Account created successfully.");

      navigate(from);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | Kotha</title>
      </Helmet>

      <section className="min-h-screen bg-base-100 pt-36 pb-20">
        <div className="container-x">
          <div className="mx-auto max-w-md rounded-[32px] border border-base-300 bg-white p-10 shadow-[0_20px_60px_rgba(63,46,51,.08)]">
            <div className="text-center mb-10">
              <h1 className="heading text-5xl text-primary">Create Account</h1>

              <p className="mt-3 text-neutral/70">
                Join Kotha and discover luxury beauty products.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full rounded-xl"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <p className="mt-1 text-sm text-error">
                  {errors.name?.message}
                </p>
              </div>

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
              <div className="relative">
                <label className="mb-2 block font-medium">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="input input-bordered w-full rounded-xl pr-12"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                      message: "Uppercase, lowercase and number required",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-11 p-1 text-neutral/50 hover:text-neutral transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
                <p className="mt-1 text-sm text-error">
                  {errors.password?.message}
                </p>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="mb-2 block font-medium">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="input input-bordered w-full rounded-xl pr-12"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-11 p-1 text-neutral/50 hover:text-neutral transition-colors"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
                <p className="mt-1 text-sm text-error">
                  {errors.confirmPassword?.message}
                </p>
              </div>

              <Button
                className="w-full h-12 text-base tracking-wide"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </Button>
            </form>

            <p className="mt-8 text-center">
              Already have an account?{" "}
              <Link to={ROUTES.LOGIN} className="font-semibold text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

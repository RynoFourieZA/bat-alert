import axios from "axios";
import batmanLogo from "../assets/batman-silhouette-svgrepo-com.svg";
import { z } from "zod";
import { useAppDispatch } from "../app/hooks";
import { setCredentials } from "../features/authSlice";
import { useNavigate } from "react-router";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "min length must be 8"),
});

type Auth = z.infer<typeof authSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const parsed = authSchema.safeParse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.flatten(),
        form: formData,
      };
    }

    const data: Auth = parsed.data;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(setCredentials(response?.data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-gray-800">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6">
          <div className="flex flex-col justify-center items-center mx-auto mb-4 h-52">
            <img
              src={batmanLogo}
              alt="the logo of batman."
              className="w-24 md:w-32"
            />
            <h1 className="text-3xl font-bold">Bat Alert</h1>
          </div>
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl mb-8">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="email"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                placeholder="example@email.com"
                required
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-8"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

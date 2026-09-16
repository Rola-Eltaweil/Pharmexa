import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../utils/apiSummary";
import { Endpoint } from "../../utils/routes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setuser } from "../../redux/userSlice";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginU = await postData(Endpoint.loginuser.url, formData);
      console.log(loginU);
      toast.success(loginU?.data?.message);
      dispatch(setuser(loginU?.data?.data));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Welcome Back</h1>

            <p className="text-gray-500 mt-2">
              Login to your Pharmexa account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-12 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-800"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-800 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Image */}
        <div className="hidden md:flex items-center justify-center bg-blue-50 p-10">
          <img
            src="https://media.istockphoto.com/id/1407452583/pl/wektor/login-i-has%C5%82o-do-komputera-i-konta.jpg?s=1024x1024&w=is&k=20&c=_wrzKNfFyb44Hc2hcspCyhalvNqlMFM4FfmBfXfIVYI="
            alt="Login"
            className="w-72 lg:w-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

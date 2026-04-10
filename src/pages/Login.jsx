import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login hatası:", error);
      setMessage("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f5f2]">
      <div className="w-full max-w-md rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-wide text-[#5c4a42]">
            KlinikAI
          </h1>
          <p className="mt-1 text-sm text-[#9a7f73]">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@clinic.com"
              className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2.5 text-sm text-[#5c4a42] outline-none transition focus:border-[#d8beb3] focus:ring-2 focus:ring-[#eee3dc]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2.5 text-sm text-[#5c4a42] outline-none transition focus:border-[#d8beb3] focus:ring-2 focus:ring-[#eee3dc]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#5c4a42] py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a3b35] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {message && (
          <div className="mt-4 rounded-xl border border-[#e7c9c9] bg-[#fff4f4] px-4 py-2.5 text-center text-sm text-[#a06a6a]">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

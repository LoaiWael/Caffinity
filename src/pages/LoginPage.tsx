import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    await login({ email, password });

    // بعد ما login تنجح أو toast تظهر لو فشل
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      navigate("/account");
    }
  };

  return (
    <>
      <title>Login</title>

      <div className="container mx-auto px-6 py-20 flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 shadow-md rounded-lg">
            <h1 className="font-heading text-3xl text-center mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-brand-gray rounded-md"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-brand-gray rounded-md"
                />
              </div>
              {error && <p className="text-brand-red text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <p className="text-center text-sm text-brand-black/70 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-brand-yellow underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

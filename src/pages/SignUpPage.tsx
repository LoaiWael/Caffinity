import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signUp, loading } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(false);

    const success: any = await signUp({ email, password, firstName, lastName });

    if (success) {
      setIsSuccess(true);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      navigate("/account");
    } else {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      toast.error("Email already exists. Please use another email.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-md rounded-lg">
          <h1 className="font-heading text-3xl text-center mb-6">
            Create Account
          </h1>

          {isSuccess && (
            <div className="text-center text-green-700 bg-green-50 p-4 rounded-md mb-4">
              <p className="font-semibold">Account created successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-md"
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
                className="w-full px-4 py-3 border rounded-md"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

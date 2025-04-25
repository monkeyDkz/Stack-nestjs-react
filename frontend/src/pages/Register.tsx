// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../services/auth";
// import { FcGoogle } from "react-icons/fc";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { GoogleLogin } from "@react-oauth/google";
// import { loginUserGoogle } from "../services/auth";

// export default function Register() {
//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const token = await registerUser(
//         form.firstname,
//         form.lastname,
//         form.email,
//         form.password
//       );
//       if (token) {
//         localStorage.setItem("token", token);
//         navigate("/profile");
//       } else {
//         setError("Inscription échouée. Réessayez.");
//       }
//     } catch (err: any) {
//       setError(err.message || "Erreur lors de l’inscription.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="h-screen bg-muted">
//       <div className="flex h-full items-center justify-center">
//         <form
//           onSubmit={handleSubmit}
//           className="flex w-full max-w-sm flex-col items-center gap-y-8"
//         >
//           <div className="flex flex-col items-center gap-y-2">
//             <h1 className="text-3xl font-semibold">Register</h1>
//             <p className="text-sm text-muted-foreground">
//               Create a new account
//             </p>
//           </div>
//           <div className="flex w-full flex-col gap-6 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
//             {error && (
//               <p className="text-red-500 text-center text-sm">{error}</p>
//             )}
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="firstname">First Name</Label>
//               <Input
//                 id="firstname"
//                 name="firstname"
//                 placeholder="Enter your first name"
//                 onChange={handleChange}
//                 className="bg-white"
//                 required
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="lastname">Last Name</Label>
//               <Input
//                 id="lastname"
//                 name="lastname"
//                 placeholder="Enter your last name"
//                 onChange={handleChange}
//                 className="bg-white"
//                 required
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 onChange={handleChange}
//                 className="bg-white"
//                 required
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 onChange={handleChange}
//                 className="bg-white"
//                 required
//               />
//             </div>
//             <Button type="submit" variant="default" disabled={loading} className="w-full">
//               {loading ? "Registering..." : "Create an account"}
//             </Button>
//             <Button variant="outline" type="button" className="w-full">
//               <FcGoogle className="mr-2 size-5" />
//               <GoogleLogin
//   onSuccess={async (credentialResponse) => {
//     const credential = credentialResponse.credential;
//     if (!credential) return;
//     const response = await loginUserGoogle(credential);
//     if (response.access_token) {
//       localStorage.setItem('token', response.access_token);
//       navigate('/profile');
//     }
//   }}
//   onError={() => alert('Google Sign-In failed')}
// />
//             </Button>
//           </div>
//           <div className="flex justify-center gap-1 text-sm text-muted-foreground">
//             <p>Already have an account?</p>
//             <a
//               href="/login"
//               className="font-medium text-primary hover:underline"
//             >
//               Log in
//             </a>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUserGoogle } from '../services/auth';
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = await registerUser(
        form.firstname,
        form.lastname,
        form.email,
        form.password
      );
      if (token) {
        localStorage.setItem('token', token);
        navigate('/profile');
      } else {
        setError('Registration failed. Try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Registration error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4 items-center">
          <img src="/images/placeholders/logos/wicked-icon.svg" alt="logo" className="h-8" />
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border bg-white text-black shadow-sm mx-auto w-full max-w-md"
          >
            <div className="flex flex-col space-y-1.5 p-6 items-center">
              <h3 className="font-semibold tracking-tight text-xl">Create an account</h3>
              <p className="text-sm text-zinc-600">Enter your details to sign up</p>
            </div>
            <div className="p-6 pt-0 grid gap-4">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const credential = credentialResponse.credential;
                  if (!credential) return;
                  const response = await loginUserGoogle(credential);
                  if (response.access_token) {
                    localStorage.setItem('token', response.access_token);
                    navigate('/profile');
                  }
                }}
                onError={() => alert('Google Sign-In failed')}
              />
              <div className="flex items-center gap-4">
                <span className="h-px w-full bg-gray-100"></span>
                <span className="text-xs text-zinc-600">OR</span>
                <span className="h-px w-full bg-gray-100"></span>
              </div>
              <div className="grid gap-2">
                <label htmlFor="firstname" className="text-sm font-medium">First name</label>
                <input
                  id="firstname"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="lastname" className="text-sm font-medium">Last name</label>
                <input
                  id="lastname"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-zinc-900 text-white hover:bg-zinc-900/90 h-10 px-4 py-2 w-full rounded-md text-sm font-medium"
              >
                {loading ? 'Registering...' : 'Create account'}
              </button>
            </div>
          </form>
          <div className="mx-auto flex gap-1 text-sm mt-4">
            <p>Already have an account?</p>
            <a href="/login" className="underline">Login</a>
          </div>
        </div>
      </div>
    </section>
  );
}

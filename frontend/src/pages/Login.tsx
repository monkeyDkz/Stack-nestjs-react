// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../services/auth';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { FcGoogle } from 'react-icons/fc';
// import { GoogleLogin } from '@react-oauth/google';
// import { loginUserGoogle } from '../services/auth';


// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = await loginUser(email, password);
//     if (token) {
//       localStorage.setItem('token', token);
//       navigate('/profile');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-md border"
//       >
//         <div className="text-center">
//           <h1 className="text-3xl font-semibold tracking-tight">Welcome Back</h1>
//           <p className="text-muted-foreground text-sm mt-1">
//             Enter your email and password to login
//           </p>
//         </div>
//         <div className="space-y-4">
//           <Input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <Button type="submit" className="w-full">
//           Login
//         </Button>
//         <div className="relative py-2">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-white px-2 text-muted-foreground">
//               or continue with
//             </span>
//           </div>
//         </div>
//         <Button type="button" variant="outline" className="w-full">
//           <FcGoogle className="mr-2" /> Google <GoogleLogin
//   onSuccess={async (credentialResponse) => {
//     const credential = credentialResponse.credential;
//     if (!credential) return alert('No Google credential received');

//     const response = await loginUserGoogle(credential);
//     if (response.access_token) {
//       localStorage.setItem('token', response.access_token);
//       navigate('/profile');
//     }
//   }}
//   onError={() => alert('Google Sign-In failed')}
// />

//         </Button>
//       </form>
//     </div>
//   );
// }



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, loginUserGoogle } from '../services/auth';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await loginUser(email, password);
    if (token) {
      localStorage.setItem('token', token);
      navigate('/profile');
    } else {
      alert('Invalid credentials');
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
              <h3 className="font-semibold tracking-tight text-xl">Log in with your email</h3>
              <p className="text-sm text-zinc-600">Enter your information to login</p>
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
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <a href="#" className="text-sm underline">Forgot password</a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
              </div>
              <button
                type="submit"
                className="bg-zinc-900 text-white hover:bg-zinc-900/90 h-10 px-4 py-2 w-full rounded-md text-sm font-medium"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="mx-auto flex gap-1 text-sm mt-4">
            <p>Don't have an account yet?</p>
            <a href="/register" className="underline">Register</a>
          </div>
        </div>
      </div>
    </section>
  );
}
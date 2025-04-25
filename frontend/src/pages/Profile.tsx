import { useEffect, useState } from 'react';
import { getProfile } from '../services/auth';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      console.log(data);
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <section className="py-32">
    <div className="container">
      <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-6 shadow-sm text-center">
        <img
          src={profile.avatar || '/images/placeholders/avatars/avatar.png'}
          alt="avatar"
          className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold">
          {profile.firstname} {profile.lastname}
        </h2>

        <p className="text-sm text-zinc-600">{profile.email}</p>

        <div className="mt-6 text-left text-sm">
          <p><strong>First Name:</strong> {profile.firstname}</p>
          <p><strong>Last Name:</strong> {profile.lastname}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.isGoogleUser && <p className="text-green-500 mt-2">Signed in with Google</p>}
        </div>
      </div>
    </div>
  </section>

  );
}
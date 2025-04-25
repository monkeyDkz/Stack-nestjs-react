export async function loginUser(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data.access_token;
    } catch {
      return null;
    }
  }
  
  export async function registerUser(firstname: string, lastname: string, email: string, password: string): Promise<string | null> {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      return data.access_token;
    } catch (err: any) {
      throw new Error(err.message || 'Registration failed');
    }
  }
  
  export async function getProfile() {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const response = await fetch('http://localhost:3000/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }

  export async function loginUserGoogle(credential: string) {
    const res = await fetch('http://localhost:3000/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });
    return res.json();
  }
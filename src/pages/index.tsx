import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/auth/me')
      .then(() => router.push('/dashboard'))
      .catch(() => router.push('/login'));
  }, [router]);

  return <p className="text-center mt-10">Redirecionando...</p>;
}
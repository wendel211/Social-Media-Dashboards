    import { useState } from 'react';
    import axios from 'axios';
    import { useRouter } from 'next/router';

    export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleLogin() {
        try {
        await axios.post('/api/login', { email, password });
        router.push('/dashboard');
        } catch (err) {
        setError('Login falhou. Verifique os dados.');
        }
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 p-2 border rounded"
        />
        <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 p-2 border rounded"
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
            Entrar
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        </main>
    );
    }

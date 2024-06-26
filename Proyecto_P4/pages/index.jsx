import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirige a /users al cargar la página raíz
        router.push('/account/login');
    }, [router]);

    return null; // O puedes mostrar un spinner mientras redirige
}

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/users';
import { Spinner } from 'components';
import { userService_2, alertService } from 'services';

export default function Edit() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        console.log('Router query ID:', id); // Añade este log para verificar el ID
        if (!id) return;

        userService_2.getById(id)
            .then(x => {
                console.log('User data fetched:', x);
                if (x) {
                    setUser(x);
                } else {
                    alertService.error('User not found');
                    router.push('/users'); // Redirigir si no se encuentra el usuario
                }
            })
            .catch(error => {
                alertService.error(error);
                console.error('Error fetching user:', error);
                router.push('/users'); // Redirigir en caso de error
            });
    }, [router.query]);

    return (
        <Layout>
            <h1>Edit User</h1>
            {user ? <AddEdit user={user} /> : <Spinner />}
        </Layout>
    );
}

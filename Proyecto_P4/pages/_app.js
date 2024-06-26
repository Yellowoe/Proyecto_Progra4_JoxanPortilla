import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/globals.css';

import { userService_2 } from 'services';
import { Nav, Alert } from 'components';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService_2.userValue);
        const publicPaths = ['/account/login', '/account/register','/users/add','/users/edit/','/users', '/forms/catalogue'];
        const path = url.split('?')[0];

        if (!userService_2.userValue && !publicPaths.includes(path)) {
            setAuthorized(true);
           // router.push({
            //    pathname: '/account/login',
              //  query: { returnUrl: router.asPath }
           //});
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            

            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav />
                <Alert />
                {authorized &&
                    <Component {...pageProps} />
                }
            </div>
        </>
    );
}

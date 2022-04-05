import { ProvideAuth } from '@hooks/useAuth';
import MainLayout from '@layout/MainLayout';
import '@styles/tailwind.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <ProvideAuth>
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            </ProvideAuth>
        </>
    );
}

export default MyApp;

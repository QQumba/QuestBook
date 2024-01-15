import 'tailwindcss/tailwind.css';
import '../app/globals.css';
import MainLayout from '@/components/main-layout';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

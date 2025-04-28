import '@/styles/globals.scss';
import styles from '@/styles/layout/Layout.module.scss';
import { Dancing_Script, Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';


const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
  weight: ['400', '500', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | The New Table',
    default: 'The New Table | Restaurant Gastronomique',
  },
  description: 'The New Table, une expérience gastronomique unique à découvrir.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${dancingScript.variable} ${montserrat.variable}`}>
      <body className={styles.body}>
        <div className={styles.leftLine}></div>
        <div className={styles.rightLine}></div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
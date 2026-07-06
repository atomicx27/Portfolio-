import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pashin Kasad — AI Solutions Developer & Full Stack Engineer',
  description:
    'BTech graduate building full-stack and AI-driven solutions. Specializing in AI implementation, web development, and data analytics. Portfolio showcasing 20+ projects across AI/ML, Full-Stack, and more.',
  keywords: [
    'Pashin Kasad',
    'AI Solutions Developer',
    'Full Stack Developer',
    'Portfolio',
    'React',
    'Next.js',
    'Python',
    'Machine Learning',
    'Power BI',
    'Data Analytics',
  ],
  authors: [{ name: 'Pashin Kasad' }],
  openGraph: {
    title: 'Pashin Kasad — AI Solutions Developer',
    description:
      'Full-stack developer specializing in AI-driven solutions. Explore 20+ projects across AI/ML, web development, and data analytics.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pashin Kasad — AI Solutions Developer',
    description:
      'Full-stack developer specializing in AI-driven solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cyberpunk" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

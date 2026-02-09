import type { Metadata } from 'next';
import { ThemeProvider } from '@design-system/theme/ThemeProvider';
import { PersonaProvider } from '@/contexts/PersonaContext';
import { PersonasPanel } from '@design-system/components/dev/PersonasPanel';
import '@design-system/theme/tokens.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'StudocuAI Design System Template',
  description: 'High-fidelity prototype template with complete design system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  var resolvedTheme = theme;
                  
                  if (theme === 'system') {
                    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  
                  document.documentElement.setAttribute('data-theme', resolvedTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="light">
          <PersonaProvider>
            {children}
            <PersonasPanel />
          </PersonaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

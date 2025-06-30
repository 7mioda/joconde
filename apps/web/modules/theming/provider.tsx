import { ThemeScript } from 'next-app-theme/theme-script';
import type React from 'react';

export function ThemingProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ThemeScript />
      {children}
    </>
  );
}
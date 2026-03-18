import { ReactNode } from 'react';
import { AlertProvider } from '@/context/AlertContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        <title>台北都會物業管理系統</title>
      </head>
      <body>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}

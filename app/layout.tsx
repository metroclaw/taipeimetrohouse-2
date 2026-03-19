import { ReactNode } from 'react';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        <title>台北都會物業管理系統</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

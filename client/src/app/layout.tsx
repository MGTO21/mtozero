import { ReactNode } from 'react';

// This is the root layout. It only exists to redirect to the proper [locale] layout.
type Props = {
  children: ReactNode;
};

// Since we have a `[locale]` dynamic layout, Next.js still expects a Root layout during Build.
export default function RootLayout({ children }: Props) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}

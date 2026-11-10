import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main>
      <h1>My Reading List</h1>
      {children}
    </main>
  );
};

export default Main;

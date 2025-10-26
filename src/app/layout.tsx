import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ClerkProvider frontendApi="your-clerk-frontend-api">
      <div style={{ display: 'flex' }}>
        <aside style={{ width: '200px', backgroundColor: '#f5f5f5' }}>
          <h2>Navigation</h2>
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>Jobs</li>
              <li>Applications</li>
              <li>Profile</li>
            </ul>
          </nav>
        </aside>
        <main style={{ flex: 1, padding: '20px' }}>{children}</main>
      </div>
    </ClerkProvider>
  );
};

export default Layout;
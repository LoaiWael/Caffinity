import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartOverlay from './CartOverlay';
import SearchOverlay from './SearchOverlay';
import { Toaster } from 'react-hot-toast';

// Wrapper component that handles page transitions
const PageTransition = ({ children, pathname }: { children: React.ReactNode; pathname: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start hidden on mount/route change
    setIsVisible(false);

    let timeoutId: NodeJS.Timeout;

    // Use double RAF + timeout to ensure the hidden state is rendered before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, 50);
      });
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [pathname]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      {children}
    </div>
  );
};

const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CartOverlay />
      <SearchOverlay />
      <main className="flex-grow">
        <PageTransition key={location.pathname} pathname={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#282828',
            color: '#FEFEFE',
          },
        }}
      />
    </div>
  );
};

export default RootLayout;

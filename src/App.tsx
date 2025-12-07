import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CartProvider } from './contexts/CartContext';
import { SearchProvider } from './contexts/SearchContext';
import { AuthProvider } from './contexts/AuthContext';
import { useEffect } from 'react';
import { migrateUsersToHaveIds } from './utils/migrateUsers';

function App() {
  useEffect(() => {
    // Run migration on app load
    migrateUsersToHaveIds();
  }, []);

  return (
    <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </CartProvider>
    </AuthProvider>
  );
}

export default App;

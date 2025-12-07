import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CartProvider } from './contexts/CartContext';
import { SearchProvider } from './contexts/SearchContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
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

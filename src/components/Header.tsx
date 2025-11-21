import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useSearch();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Collections', path: '/collections' },
    { name: 'Coffee', path: '/coffee' },
    { name: 'Tea', path: '/tea' },
    { name: 'Contact us', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-brand-white/85 backdrop-blur-md rounded-b-xl shadow-brand-black/15 shadow-xl">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/c48a/17ee/cfff4b8a09e72963d2f7e426015077cf?Expires=1762732800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MaaUYT6~45Lo7-v1EQA5LHn39eGr-37guqIBhcG-eDgfiYbP0~qVj5i9HP~qXyCydXD4fZf7wxxHon1Hvodsa8p75lyWkNeuGv6VKLckNOd07ESq-cFCJl7cXgjHVax9m76oenSzqhA~COUUwN887hzVTtnEdt3U5H8gc4l~nH~RjjERlIMw9ZEwDRnmweZ0F5M0sqvb3uXMsVtF3k9gRREgVTwgwy4h072NOQm60eovncRor4GyXQ26f~jLD--g-wcs~LBirouts-tVte7SsVpV79~nnYEKg~MH1~pYdhE8Vz0Vaqg78Plru61ioCsQBb6KhbJOxrUDYI9qA81guA__" alt="Caffinity Logo" className="h-8 w-8 object-contain" />
              <span className="font-heading text-xl font-bold text-brand-black">Caffinity</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(true)} className="hidden lg:block text-brand-black hover:text-brand-black/70 transition-colors" title='Search'>
              <Search className="h-6 w-6" />
            </button>
            
            {isAuthenticated ? 
            <Link to="/account" className="text-brand-black hover:text-brand-black/70 transition-colors" title="Profile">
              <User className="h-6 w-6" />
            </Link> :
            <Link to="/login" className='border-[1px] border-brand-black py-1 px-3 rounded-lg hover:bg-brand-black/10 transition-colors' title='Login'>Login</Link>
            }

            <button onClick={() => setIsCartOpen(true)} className="relative text-brand-black hover:text-brand-black/70 transition-colors" title='My bag'>
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-white text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="lg:hidden text-brand-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-2 bg-brand-gray/80 backdrop-blur-lg rounded-b-lg mx-3 px-3">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? 'text-brand-black font-semibold' : 'text-brand-black/70 hover:text-brand-black'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full">
          <nav className="flex flex-col p-4 space-y-2 container mx-auto bg-brand-gray/80 backdrop-blur-lg shadow-lg rounded-lg">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider ${
                    isActive ? 'bg-brand-gray-light text-brand-black' : 'text-brand-black/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
             <button onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }} className="px-3 py-2 text-left text-base font-medium uppercase tracking-wider text-brand-black/70">
                Search
              </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

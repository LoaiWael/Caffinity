import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import drinksData from "../data/drinks_menu.json";

interface Drink {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface SearchContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredDrinks: Drink[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredDrinks = useMemo(() => {
    if (!query) return [];
    return drinksData.filter(
      (drink) =>
        drink.name.toLowerCase().includes(query.toLowerCase()) ||
        drink.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <SearchContext.Provider
      value={{ isSearchOpen, setIsSearchOpen, query, setQuery, filteredDrinks }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearch must be used within a SearchProvider");
  return context;
};

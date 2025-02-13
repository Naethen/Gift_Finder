'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Gift } from '@/types';

interface FavoritesContextType {
  favorites: Gift[];
  addFavorite: (gift: Gift) => void;
  removeFavorite: (giftId: string) => void;
  isFavorite: (giftId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Gift[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (gift: Gift) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === gift.id)) return prev;
      return [...prev, gift];
    });
  };

  const removeFavorite = (giftId: string) => {
    setFavorites(prev => prev.filter(gift => gift.id !== giftId));
  };

  const isFavorite = (giftId: string) => {
    return favorites.some(gift => gift.id === giftId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

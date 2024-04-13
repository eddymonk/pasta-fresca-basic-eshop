import { useState, useEffect } from "react";

const useFavoritesCount = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("Favorites")) || [];
    setFavoritesCount(favorites.length);
  }, []);

  const decreaseFavoritesCount = () => {
    setFavoritesCount((prevCount) => prevCount - 1);
  };

  return [favoritesCount, decreaseFavoritesCount];
};
export default useFavoritesCount;

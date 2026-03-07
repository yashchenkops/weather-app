const KEY = 'weather-app:favorites';

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function setFavorites(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function toggleFavorite(city) {
  const list = getFavorites();
  const exists = list.includes(city);

  if (exists) {
    const next = list.filter((c) => c !== city);
    setFavorites(next);
    return next;
  }

  if (list.length >= 5) {
    throw new Error('Favorites limit is 5');
  }

  const next = [...list, city];
  setFavorites(next);
  return next;
}

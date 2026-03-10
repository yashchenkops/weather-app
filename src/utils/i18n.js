import { ref } from "vue"

export const lang = ref("en")

export const translations = {
  en: {
    home: "Home",
    favorites: "Favorites",
    addCity: "Add city",
    search: "Enter city",
    day: "Day",
    week: "Week",
    addToFavorites: "☆ Add to favorites",
    favorite: "★ Favorite",
    city: "City",
    temperature: "Temperature",
    weatherConditions: "Weather conditions",
    modalConfirmText: "Are you sure you want to delete this block?",
    modalConfirm: "Confirm",
    modalCancel: "Cancel",
    alert: "Must be at least one block!",
  },

  ua: {
    home: "Головна",
    favorites: "Вибране",
    addCity: "Додати місто",
    search: "Введіть місто",
    day: "День",
    week: "Тиждень",
    addToFavorites: "☆ Додати у вибране",
    favorite: "★ У вибраному",
    city: "Місто",
    temperature: "Температура",
    weatherConditions: "Погодні умови",
    modalConfirmText: "Ви впевнені, що хочете видалити цей блок?",
    modalConfirm: "Підтвердити",
    modalCancel: "Відмінити",
    alert: "Повинен бути хоч би один блок!",
  }
}

export function t(key) {
  return translations[lang.value][key] ?? key;
}
// src/hooks/useLocalStorage.ts
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Lazy initializer: localStorage hanya dibaca sekali saat komponen pertama kali muncul
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : initialValue;
  });

  // Setiap kali value berubah, simpan ulang ke localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center transition-colors duration-300 rounded-lg w-12 h-12 bg-latte-base dark:bg-frappe-base hover:bg-latte-mantle dark:hover:bg-frappe-mantle"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 text-frappe-text" />
      ) : (
        <FiMoon className="w-5 h-5 text-latte-text" />
      )}
    </button>
  );
}

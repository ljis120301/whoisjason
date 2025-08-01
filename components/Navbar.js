'use client';

import React, { useState, useCallback, useEffect, useMemo, Suspense } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';
import { useDebouncedCallback } from 'use-debounce';

const menuItems = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'featured', label: 'Featured', href: '#featured' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

function NavbarContent() {
  const [active, setActive] = useState(null);

  // Debounced scroll handler
  const handleScroll = useDebouncedCallback(() => {
    const sections = menuItems.map(item => ({
      id: item.id,
      element: document.querySelector(item.href)
    }));

    const viewportHeight = window.innerHeight;
    const currentSection = sections.find(section => {
      if (!section.element) return false;
      const rect = section.element.getBoundingClientRect();
      return rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2;
    });

    setActive(currentSection ? menuItems.find(item => item.id === currentSection.id)?.label : null);
  }, 100);

  useEffect(() => {
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Memoize menu items to prevent unnecessary re-renders
  const menuItemsComponent = useMemo(() => 
    menuItems.map(({ id, label, href }) => (
      <MenuItem
        key={id}
        setActive={setActive}
        active={active}
        item={label}
        onClick={(e) => handleClick(e, href)}
        initial={false}
      />
    )), [active, handleClick]);

  return (
    <Menu setActive={setActive}>
      {menuItemsComponent}
    </Menu>
  );
}

// Wrap the navbar in Suspense to handle any loading states
export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <NavbarContent />
    </Suspense>
  );
}

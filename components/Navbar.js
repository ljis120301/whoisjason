'use client';

import React, { useState, useCallback, useEffect, useMemo, Suspense } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';
import { useDebouncedCallback } from 'use-debounce';

const menuItems = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#About' },
  { id: 'featured', label: 'Featured', href: '#Featured' },
  { id: 'projects', label: 'Projects', href: '#section_4' },
  { id: 'blog', label: 'Blog', href: '#section_5' },
  { id: 'contact', label: 'Contact', href: '#section_6' }
];

function NavbarContent() {
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Only run after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (mounted) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [mounted, handleScroll]);

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
      />
    )), [active, handleClick]);

  // Don't render until after hydration to prevent mismatch
  if (!mounted) return null;

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

'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import ThemeToggle from '@/components/ThemeToggle';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuIndicator } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { HyperText } from '@/components/ui/hyper-text';

const links = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'featured', label: 'Featured', href: '#featured' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleScroll = useDebouncedCallback(() => {
    const sections = links.map(item => ({ id: item.id, el: document.querySelector(item.href) }));
    const vh = window.innerHeight;
    const current = sections.find(s => {
      if (!s.el) return false;
      const r = s.el.getBoundingClientRect();
      return r.top <= vh * 0.35 && r.bottom >= vh * 0.35;
    });
    setActive(current ? current.id : null);
  }, 100);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const onClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const items = useMemo(() => links, []);

  return (
    <div className="sticky top-6 inset-x-0 z-50 px-4">
      <div className="max-w-6xl mx-auto rounded-md border border-input bg-background/70 backdrop-blur px-3 py-2">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {items.map(({ id, label, href }) => {
                  const showPill = hovered ? hovered === id : active === id;
                  return (
                    <NavigationMenuItem key={id}>
                      <NavigationMenuLink
                        href={href}
                        onClick={(e) => onClick(e, href)}
                        onMouseEnter={() => setHovered(id)}
                        onMouseLeave={() => setHovered(null)}
                        className={cn(
                          "group relative px-3 py-1.5 text-xs rounded-md transition-colors",
                          "hover:bg-accent/40 hover:text-foreground hover:underline underline-offset-4",
                          (hovered ? hovered === id : active === id) && "text-foreground"
                        )}
                      >
                        {showPill && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-md bg-accent/40"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span className="relative inline-block">
                          <HyperText className="text-xs">{label}</HyperText>
                        </span>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
              <NavigationMenuIndicator />
            </NavigationMenu>
          </nav>
          <div className="w-12 h-12 flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

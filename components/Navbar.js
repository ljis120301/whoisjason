'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import ThemeToggle from '@/components/ThemeToggle';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <div className="fixed top-4 inset-x-0 z-50 px-4 flex justify-center pointer-events-none">
      <div className="pointer-events-auto rounded-full border border-border/40 bg-background/80 backdrop-blur-md shadow-sm px-4 py-2 transition-all duration-300 hover:shadow-md hover:border-border/60">
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-1">
                {items.map(({ id, label, href }) => {
                  const isActive = active === id;
                  return (
                    <NavigationMenuItem key={id}>
                      <NavigationMenuLink
                        href={href}
                        onClick={(e) => onClick(e, href)}
                        onMouseEnter={() => setHovered(id)}
                        onMouseLeave={() => setHovered(null)}
                        className={cn(
                          "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
                          isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 bg-primary rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        {hovered === id && !isActive && (
                          <motion.div
                            layoutId="nav-hover"
                            className="absolute inset-0 bg-secondary rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{label}</span>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div className="h-6 w-px bg-border/50" />
          <div className="flex items-center justify-center pl-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

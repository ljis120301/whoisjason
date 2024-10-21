'use client';

import React, { useState } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';
import { cn } from "@/lib/utils";
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [active, setActive] = useState(null);

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setActive(null);
  };

  return (
    <div className={cn("fixed top-6 inset-x-0 max-w-3xl mx-auto z-50 flex justify-between items-center")}>
      <Menu setActive={setActive}>
        <MenuItem 
          setActive={setActive} 
          active={active} 
          item="Home"
          onClick={(e) => handleClick(e, "#section_1")}
        />
        <MenuItem 
          setActive={setActive} 
          active={active} 
          item="Featured"
          onClick={(e) => handleClick(e, "#section_2")}
        />
        <MenuItem 
          setActive={setActive} 
          active={active} 
          item="About"
          onClick={(e) => handleClick(e, "#section_3")}
        />
        <MenuItem 
          setActive={setActive} 
          active={active} 
          item="Projects"
          onClick={(e) => handleClick(e, "#section_4")}
        />
        <MenuItem 
          setActive={setActive} 
          active={active} 
          item="Blog"
          onClick={(e) => handleClick(e, "#section_5")}
        />
        <MenuItem 
          setActive={setActive} 
          active={active} 
          item="Contact"
          onClick={(e) => handleClick(e, "#section_6")}
        />
      </Menu>
      <ThemeToggle />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';
import { cn } from "@/lib/utils";

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
    <Menu setActive={setActive}>
      <MenuItem 
        setActive={setActive} 
        active={active} 
        item="Home"
        onClick={(e) => handleClick(e, "#hero")}
      />
      <MenuItem 
        setActive={setActive} 
        active={active} 
        item="About"
        onClick={(e) => handleClick(e, "#About")}
      />
      <MenuItem 
        setActive={setActive} 
        active={active} 
        item="Featured"
        onClick={(e) => handleClick(e, "#Featured")}
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
  );
}

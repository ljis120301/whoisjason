'use client';
import XmrAddress from '@/components/ui/XmrAddress.jsx';

export default function Footer() {
  const XMR_ADDRESS = '48xWV6Ej4qRPZdKVEX7xQgLyWvxrSmCVXZS5pLXGpuPbMH6GhtiBjXBcHqHLxMMmEW474dkWTdLEsR6nARhhgKGRBou6nSk';
  return (
    <footer className="sticky z-0 bottom-0 left-0 w-full bg-background text-foreground">
      <div className="relative overflow-hidden w-full h-64 sm:h-72 md:h-80 px-6 md:px-12 py-8">
        <div className="relative z-10 flex w-full items-start justify-between">
          <div className="flex-1 min-w-0 pr-6">
            <XmrAddress address={XMR_ADDRESS} />
          </div>
          <div className="flex flex-row space-x-8 sm:space-x-16 md:space-x-24 text-xs sm:text-sm md:text-base">
            <ul className="text-muted-foreground">
              <li className="hover:underline cursor-pointer"><a href="#hero">Home</a></li>
              <li className="hover:underline cursor-pointer"><a href="#featured">Featured</a></li>
              <li className="hover:underline cursor-pointer"><a href="#projects">Projects</a></li>
            </ul>
            <ul className="text-muted-foreground">
              <li className="hover:underline cursor-pointer"><a href="https://github.com/whoisjasong" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="pointer-events-none select-none absolute bottom-0 left-0 w-full px-6 md:px-12">
          <div className="text-[16vw] sm:text-[12vw] md:text-[10vw] font-extrabold leading-none tracking-tight text-frappe-peach/10 dark:text-frappe-yellow/10 whitespace-nowrap overflow-hidden">
            pls donate
          </div>
        </div>
      </div>
      <div className="px-6 md:px-12 pb-4 text-muted-foreground text-xs flex items-center justify-between">
        <span>© {new Date().getFullYear()} whoisjason.me</span>
        <a className="hover:underline" href="#hero">Back to top</a>
      </div>
    </footer>
  );
}

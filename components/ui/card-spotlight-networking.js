import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CardSpotlightNetworking({ className }) {
  return (
    <CardSpotlight className={`w-full ${className}`}>
      <div className="p-2 sm:p-3 md:p-4 flex flex-col justify-between h-full">
        <h3 className="text-sm sm:text-base md:text-lg font-bold relative z-20 text-latte-text dark:text-frappe-text mb-2 sm:mb-3 line-clamp-2">
          Network Fundamentals
        </h3>
        <div className="text-latte-subtext0 dark:text-frappe-subtext0 relative z-20 flex-grow">
          <ul className="list-none space-y-1.5 sm:space-y-2 md:space-y-3">
            <Skill icon={<NetworkingIcon />} title="Network Protocols" />
            <Skill icon={<SecurityIcon />} title="Network Security" />
            <Skill icon={<TopologyIcon />} title="Network Architecture" />
            <Skill icon={<TroubleshootIcon />} title="Troubleshooting" />
          </ul>
        </div>
        <p className="text-latte-subtext1 dark:text-frappe-subtext1 mt-2 sm:mt-3 relative z-20 text-xs sm:text-sm truncate">
          Building secure network infrastructure
        </p>
      </div>
    </CardSpotlight>
  );
}

const Skill = ({ icon, title }) => (
  <li className="flex items-center gap-2 sm:gap-3">
    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-latte-blue dark:text-frappe-blue">
      {icon}
    </div>
    <p className="text-latte-text dark:text-frappe-text text-xs sm:text-sm md:text-base truncate">
      {title}
    </p>
  </li>
);

const NetworkingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M15 20c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1M10 20c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1m1-2h10V7c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v1" />
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
  </svg>
);

const TopologyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
  </svg>
);

const TroubleshootIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z" />
  </svg>
); 
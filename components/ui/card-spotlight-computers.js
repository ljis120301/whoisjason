import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CardSpotlightComputers({ className }) {
  return (
    <CardSpotlight className={`w-full ${className}`}>
      <div className="p-2 sm:p-3 md:p-4 flex flex-col justify-between h-full">
        <h3 className="text-sm sm:text-base md:text-lg font-bold relative z-20 text-latte-text dark:text-frappe-text mb-2 sm:mb-3 line-clamp-2">
          PC Repair & Support
        </h3>
        <div className="text-latte-subtext0 dark:text-frappe-subtext0 relative z-20 flex-grow">
          <ul className="list-none space-y-1.5 sm:space-y-2 md:space-y-3">
            <Skill icon={<DataRecoveryIcon />} title="Data Recovery" />
            <Skill icon={<PhysicalUpgradesIcon />} title="Physical Upgrades" />
            <Skill icon={<PCBuildingIcon />} title="PC Building" />
            <Skill icon={<TroubleshootingIcon />} title="Troubleshooting Layer 1" />
          </ul>
        </div>
        <p className="text-latte-subtext1 dark:text-frappe-subtext1 mt-2 sm:mt-3 relative z-20 text-xs sm:text-sm truncate">
          Expert in PC hardware and software
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

const DataRecoveryIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
    </svg>
);

const PhysicalUpgradesIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 7.77L18.39 12 12 16.23V7.77M12 4L2 12l10 8V4z"/>
    </svg>
);

const PCBuildingIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M4 6h16v12H4zm18-2H2v16h20V4zM9 14h6v2H9zm2-3h4v2h-4zm-2-3h2v2H9z"/>
    </svg>
);

const TroubleshootingIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
); 
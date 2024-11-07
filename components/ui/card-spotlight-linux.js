import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CardSpotlightLinux({ className }) {
  return (
    <CardSpotlight className={`w-full ${className}`}>
      <div className="p-3 sm:p-4 flex flex-col justify-between h-full">
        <h3 className="text-lg sm:text-xl font-bold relative z-20 text-latte-text dark:text-frappe-text mb-3">
          Linux Enthusiast
        </h3>
        <div className="text-latte-subtext0 dark:text-frappe-subtext0 relative z-20 flex-grow">
          <ul className="list-none space-y-2 sm:space-y-3">
            <Skill icon={<ArchIcon />} title="Arch Linux" />
            <Skill icon={<DebianIcon />} title="Debian" />
            <Skill icon={<FedoraIcon />} title="Fedora/RHEL" />
            <Skill icon={<TerminalIcon />} title="Shell Scripting" />
          </ul>
        </div>
        <p className="text-latte-subtext1 dark:text-frappe-subtext1 mt-3 relative z-20 text-sm">
          Open source advocate & power user
        </p>
      </div>
    </CardSpotlight>
  );
}

const Skill = ({ icon, title }) => (
  <li className="flex items-center gap-3">
    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 text-latte-blue dark:text-frappe-blue">{icon}</div>
    <p className="text-latte-text dark:text-frappe-text text-sm sm:text-base">{title}</p>
  </li>
);

const ArchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M11.995 0C10.775 2.819 10.03 4.664 8.87 7.413c.666.721 1.482 1.558 2.809 2.511-1.427-.587-2.399-1.177-3.126-1.787-1.389 2.9-3.567 7.033-7.99 14.99 3.474-2.006 6.164-3.242 8.675-3.714-.108-.463-.17-.963-.166-1.485l.004-.143c.052-2.106 1.146-3.726 2.445-3.615 1.299.111 2.307 1.918 2.256 4.024-.01.402-.053.788-.127 1.145 2.48.487 5.143 1.724 8.521 3.714-.67-1.234-1.271-2.346-1.842-3.406-1.002-.775-2.042-1.785-4.169-2.879 1.461.379 2.508.817 3.322 1.306C14.588 6.88 14.129 5.284 11.995 0Z"/>
  </svg>
);

const DebianIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-full h-full">
    <path d="M3.973 10.755c0.085-0.271 0.171-0.624 0.24-0.984l0.01-0.066c-0.437 0.55-0.212 0.662-0.25 1.037zM4.761 7.43c0.087 0.712-0.537 1 0.137 0.525 0.375-0.825-0.137-0.225-0.125-0.525zM16.562 1.154c0.327-0.062 0.734-0.115 1.146-0.147l0.041-0.003c-0.462 0.038-0.925 0.063-1.375 0.125l0.187 0.025zM27.378 14.53l-0.087 0.187c-0.145 1.031-0.448 1.963-0.885 2.814l0.023-0.049c0.472-0.854 0.803-1.852 0.933-2.912l0.004-0.040zM13.701 17.507c-0.153-0.187-0.283-0.401-0.381-0.633l-0.007-0.017c0.134 0.419 0.316 0.784 0.546 1.113l-0.009-0.013-0.15-0.45zM12.926 17.545l-0.062 0.35c0.298 0.477 0.628 0.89 1 1.262l-0-0c-0.3-0.587-0.525-0.825-0.937-1.625zM25.276 13.968c-0.028 0.687-0.2 1.328-0.487 1.901l0.012-0.027-0.437 0.226c-0.35 0.675 0.038 0.437-0.212 0.975-0.602 0.595-1.264 1.13-1.976 1.596l-0.048 0.030c-0.251 0 0.175-0.312 0.237-0.425-0.739 0.5-0.601 0.75-1.713 1.062l-0.038-0.075c-0.468 0.16-1.008 0.253-1.569 0.253-2.759 0-4.996-2.237-4.996-4.996 0-0.020 0-0.041 0-0.061l-0 0.003c-0.037 0.212-0.087 0.162-0.15 0.25-0.010-0.112-0.016-0.242-0.016-0.374 0-1.752 1.015-3.268 2.49-3.989l0.026-0.012c0.55-0.283 1.2-0.448 1.888-0.448 1.066 0 2.040 0.397 2.78 1.052l-0.004-0.004c-0.771-0.993-1.965-1.626-3.306-1.626-0.033 0-0.066 0-0.099 0.001l0.005-0c-1.417 0.013-2.649 0.792-3.303 1.943l-0.010 0.019c-0.75 0.475-0.837 1.837-1.162 2.076-0.068 0.337-0.107 0.724-0.107 1.12 0 2.225 1.232 4.161 3.051 5.165l0.030 0.015c0.337 0.237 0.1 0.262 0.15 0.437-0.752-0.362-1.388-0.85-1.906-1.443l-0.006-0.007c0.28 0.439 0.611 0.814 0.992 1.131l0.008 0.006c-0.687-0.225-1.587-1.625-1.849-1.687 1.162 2.074 4.724 3.65 6.574 2.874-0.164 0.012-0.355 0.019-0.547 0.019-0.845 0-1.658-0.135-2.419-0.385l0.055 0.016c-0.412-0.2-0.962-0.637-0.875-0.712 0.83 0.359 1.796 0.567 2.811 0.567 1.736 0 3.329-0.61 4.577-1.627l-0.013 0.010c0.55-0.437 1.162-1.175 1.337-1.187-0.25 0.4 0.050 0.2-0.15 0.55 0.55-0.9-0.25-0.375 0.575-1.55l0.3 0.412c-0.112-0.75 0.925-1.651 0.825-2.827 0.237-0.375 0.25 0.375 0 1.212 0.362-0.925 0.1-1.062 0.187-1.824 0.1 0.215 0.198 0.476 0.277 0.745l0.011 0.042c-0.015-0.121-0.023-0.262-0.023-0.405 0-0.581 0.138-1.13 0.382-1.615l-0.009 0.021c-0.112-0.062-0.35 0.375-0.4-0.662 0-0.462 0.125-0.25 0.175-0.35-0.252-0.292-0.423-0.66-0.474-1.066l-0.001-0.010c0.1-0.162 0.275 0.412 0.425 0.425-0.111-0.386-0.2-0.845-0.247-1.316l-0.003-0.034c-0.425-0.85-0.15 0.125-0.5-0.375-0.425-1.363 0.375-0.312 0.425-0.925 0.533 0.885 0.956 1.911 1.212 3.002l0.014 0.073c-0.151-0.837-0.363-1.575-0.64-2.28l0.028 0.081c0.2 0.087-0.325-1.551 0.262-0.462-0.805-2.376-2.428-4.295-4.526-5.464l-0.050-0.025c0.225 0.212 0.525 0.487 0.412 0.525-0.937-0.562-0.775-0.6-0.912-0.837-0.762-0.312-0.812 0.025-1.325 0-0.865-0.449-1.877-0.854-2.933-1.158l-0.119-0.029 0.062 0.287c-0.962-0.312-1.125 0.125-2.162 0-0.063-0.050 0.337-0.175 0.662-0.225-0.926 0.125-0.876-0.175-1.788 0.038 0.194-0.132 0.419-0.265 0.652-0.384l0.035-0.016c-0.75 0.050-1.799 0.437-1.475 0.087-1.776 0.642-3.315 1.483-4.697 2.52l0.046-0.033-0.036-0.275c-0.562 0.675-2.449 2.013-2.599 2.888l-0.164 0.037c-0.287 0.5-0.475 1.062-0.712 1.576-0.375 0.65-0.562 0.25-0.5 0.35-0.534 1.086-1.027 2.373-1.408 3.708l-0.041 0.169c0.074 0.691 0.116 1.493 0.116 2.305 0 0.402-0.010 0.802-0.031 1.199l0.002-0.056c-0.003 0.111-0.005 0.242-0.005 0.374 0 6.747 4.321 12.485 10.347 14.597l0.108 0.033c0.811 0.203 1.743 0.32 2.702 0.32 0.144 0 0.288-0.003 0.43-0.008l-0.021 0.001c-1.237-0.35-1.4-0.187-2.599-0.612-0.875-0.4-1.062-0.875-1.675-1.412l0.25 0.437c-1.213-0.425-0.712-0.525-1.701-0.837l0.262-0.337c-0.519-0.189-0.94-0.545-1.206-1.001l-0.006-0.011-0.425 0.012c-0.512-0.626-0.787-1.088-0.762-1.451l-0.139 0.25c-0.162-0.262-1.899-2.376-1-1.888-0.258-0.179-0.469-0.409-0.62-0.677l-0.005-0.010 0.175-0.212c-0.364-0.413-0.633-0.918-0.77-1.476l-0.005-0.024c0.131 0.198 0.326 0.345 0.555 0.411l0.007 0.002c-1.1-2.714-1.162-0.15-2.001-2.752l0.187-0.025c-0.104-0.174-0.213-0.383-0.309-0.599l-0.016-0.039 0.075-0.75c-0.787-0.925-0.225-3.876-0.112-5.501 0.338-0.964 0.709-1.781 1.142-2.559l-0.043 0.083-0.262-0.050c0.5-0.887 2.925-3.589 4.050-3.45 0.537-0.687-0.112 0-0.225-0.175 1.2-1.238 1.575-0.875 2.376-1.1 0.875-0.501-0.75 0.2-0.337-0.189 1.5-0.375 1.062-0.875 3.025-1.062 0.2 0.125-0.487 0.175-0.65 0.325 0.719-0.231 1.545-0.365 2.403-0.365 1.194 0 2.328 0.259 3.349 0.723l-0.051-0.021c2.392 1.275 4.071 3.617 4.408 6.373l0.004 0.040 0.1 0.025c0.024 0.284 0.038 0.615 0.038 0.949 0 0.863-0.091 1.705-0.264 2.517l0.014-0.079 0.25-0.525zM17 1.542l-0.187 0.037 0.175-0.012v-0.025zM16.475 1.392c0.25 0.050 0.562 0.087 0.525 0.15 0.287-0.062 0.35-0.125-0.537-0.15zM22.001 13.632c0.062-0.901-0.175-0.626-0.25-0.276 0.087 0.050 0.162 0.625 0.25 0.275zM21.025 16.194c0.274-0.375 0.479-0.82 0.583-1.302l0.004-0.023c-0.099 0.347-0.24 0.65-0.42 0.925l0.008-0.013c-0.937 0.587-0.087-0.337 0-0.7-1 1.262-0.137 0.75-0.175 1.112zM18.349 16.856c-0.5 0 0.1 0.25 0.751 0.35 0.18-0.135 0.339-0.27 0.489-0.414l-0.002 0.002c-0.242 0.056-0.52 0.087-0.805 0.087-0.152 0-0.302-0.009-0.45-0.027l0.018 0.002z" />
  </svg>
);

const FedoraIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
    <path d="M255.996,0.504C114.949,0.504,0.6,114.803,0.5,255.831v197.72c0.075,32.021,26.047,57.945,58.088,57.945H256.1c141.065-0.055,255.4-114.41,255.4-255.486C511.5,114.901,397.107,0.504,255.996,0.504z M353.842,119.238c-8.071,0-11.004-1.551-22.83-1.551c-34.915,0-63.234,28.279-63.293,63.194v54.999c0,4.928,4,8.922,8.94,8.922l41.581,0.009c15.491,0,28.008,12.357,28.008,27.889c0.009,15.633-12.646,27.941-28.303,27.941h-50.227v63.555c0,66.221-53.688,119.916-119.911,119.916c-10.047,0-17.191-1.136-26.492-3.564c-13.561-3.551-24.643-14.671-24.647-27.604c0-15.627,11.347-27.001,28.309-27.001c8.074,0,11.001,1.551,22.831,1.551c34.913,0,63.232-28.281,63.295-63.192V309.3c0-4.932-4.007-8.924-8.941-8.924l-41.581-0.005c-15.493,0-28.01-12.358-28.01-27.891c-0.008-15.635,12.646-27.939,28.305-27.939h50.22v-63.559c0-66.221,53.695-119.914,119.916-119.914c10.047,0,17.191,1.134,26.489,3.566c13.565,3.547,24.644,14.667,24.652,27.6C382.153,107.867,370.805,119.238,353.842,119.238z" />
  </svg>
);

const TerminalIcon = () => (
  <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
    <path d="M59,57H49.6a1,1,0,1,1,0-2H58V42h-14a1,1,0,0,1,0-2H59a1,1,0,0,1,1,1V56A1,1,0,0,1,59,57Z"/>
    <path d="M46.4,57h-2a1,1,0,0,1,0-2h2a1,1,0,1,1,0,2Z"/>
    <path d="M52,60H44a1,1,0,0,1-.9-.57,1,1,0,0,1,.12-1l4-5a1,1,0,0,1,1.56,0l4,5a1,1,0,0,1,.12,1A1,1,0,0,1,52,60Zm-5.92-2h3.84L48,55.6Z"/>
    <path d="M37.82,40.91a1,1,0,0,1-.75-.34,1,1,0,0,1,.09-1.41,4.09,4.09,0,1,0-5.8-.39,1,1,0,0,1-1.5,1.32A6.09,6.09,0,0,1,34.45,30a6.09,6.09,0,0,1,4,10.66A1,1,0,0,1,37.82,40.91Z"/>
    <path d="M33.82,60c-5.11,0-9.27-5-9.27-11.18,0-4.48,2.2-8.51,5.6-10.28a1,1,0,1,1,.92,1.78c-2.75,1.42-4.52,4.76-4.52,8.5,0,5.06,3.26,9.18,7.27,9.18s7.27-4.12,7.27-9.18a9.73,9.73,0,0,0-3.83-8.08,1,1,0,1,1,1.12-1.66,11.72,11.72,0,0,1,4.71,9.74C43.09,55,38.93,60,33.82,60Z"/>
    <path d="M26.82,38.36a1,1,0,0,1-.32-1.94l3.82-1.28A1,1,0,0,1,31,37l-3.82,1.27A.84.84,0,0,1,26.82,38.36Z"/>
    <path d="M33.18,60H23a1,1,0,0,1,0-2H33.18a1,1,0,1,1,0,2Z"/>
    <path d="M14.92,29.18a3.93,3.93,0,0,1-1.43-.26,4,4,0,0,1-.21-7.39,3.92,3.92,0,0,1,3.06-.08,4,4,0,0,1,2.31,5.16,4,4,0,0,1-2.1,2.22A3.89,3.89,0,0,1,14.92,29.18Zm0-6a2,2,0,0,0-1.87,1.29,2,2,0,1,0,3.73,1.43,1.94,1.94,0,0,0,0-1.53h0a2,2,0,0,0-1.11-1.06A2.17,2.17,0,0,0,14.92,23.18Z"/>
    <path d="M21.62,26.47a1,1,0,0,1-.91-.59L18.26,20.4a1,1,0,1,1,1.82-.81l2.45,5.48a1,1,0,0,1-.5,1.32A1,1,0,0,1,21.62,26.47Z"/>
    <path d="M51.91,38a.92.92,0,0,1-.36-.07A1,1,0,0,1,51,36.64l6.83-17.87a3,3,0,0,0-1.74-3.87L33.65,6.33a3,3,0,0,0-3.88,1.74l-.39,1a1,1,0,1,1-1.86-.72l.39-1a5,5,0,0,1,6.46-2.88L56.79,13a5,5,0,0,1,2.89,6.44L52.84,37.36A1,1,0,0,1,51.91,38Z"/>
  </svg>
); 
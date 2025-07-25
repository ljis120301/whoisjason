export function LinuxCard({ command, output }) {
  return (
    <aside className="bg-frappe-mantle text-frappe-text p-6 rounded-lg w-full h-full font-mono text-sm flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-frappe-red"></div>
          <div className="w-3 h-3 rounded-full bg-frappe-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-frappe-green"></div>
        </div>
        <p className="text-xs text-frappe-subtext0">zsh</p>
      </div>
      <div className="flex-grow">
        <p className="text-frappe-green">
          <span className="text-frappe-mauve">~</span>
          <span className="text-frappe-overlay2">❯</span> 
          &nbsp;{command}
        </p>
        {output && <p className="text-frappe-text mt-2 whitespace-pre-wrap">{output}</p>}
      </div>
    </aside>
  );
}

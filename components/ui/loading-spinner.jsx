export function LoadingSpinner({ className = "" }) {
    return (
      <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`} 
        role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
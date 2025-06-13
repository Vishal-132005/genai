/*
  This component is not strictly necessary as we can use `Loader2` from `lucide-react` directly.
  Example: import { Loader2 } from "lucide-react";
           <Loader2 className="animate-spin h-5 w-5" />
  Keeping this file as a placeholder in case a custom spinner is desired later.
  For now, we will use lucide-react's Loader2.
*/
export function LoadingSpinner({ className }: { className?: string }) {
  // Using lucide-react's Loader2 is preferred.
  // This is a basic SVG example if lucide-react wasn't available or a custom one was needed.
  const effectiveClassName = `animate-spin h-5 w-5 ${className || ''}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={effectiveClassName}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

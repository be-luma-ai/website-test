"use client";

import { Button } from "./button";

export function GoogleButton({
  onClick,
  loading,
  children,
}: {
  onClick: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={loading}
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium shadow-sm"
    >
      <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block">
        <g>
          <path
            fill="#4285F4"
            d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.91 2.36 30.28 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.99 6.21C12.13 13.16 17.61 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.36 46.1 31.41 46.1 24.55z"
          />
          <path
            fill="#FBBC05"
            d="M10.68 28.65c-1.13-3.36-1.13-6.99 0-10.35l-7.99-6.21C.64 16.09 0 19.01 0 22c0 2.99.64 5.91 1.69 8.56l7.99-6.21z"
          />
          <path
            fill="#EA4335"
            d="M24 44c6.28 0 11.91-2.07 15.94-5.64l-7.19-5.6c-2.01 1.35-4.59 2.14-8.75 2.14-6.39 0-11.87-3.66-13.32-8.15l-7.99 6.21C6.73 42.52 14.82 48 24 48z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </g>
      </svg>
      {children || "Continuar con Google"}
    </Button>
  );
}

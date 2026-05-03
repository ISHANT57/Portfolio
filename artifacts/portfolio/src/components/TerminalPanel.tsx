import { ReactNode } from "react";

interface TerminalPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalPanel({ title, children, className = "" }: TerminalPanelProps) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        background: "var(--term-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--b3)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 var(--b4)"
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-4 py-3 gap-3"
        style={{
          background: "var(--term-bar)",
          borderBottom: "1px solid var(--b4)"
        }}
      >
        {/* macOS traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57", boxShadow: "0 0 6px rgba(255,95,87,0.5)" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E", boxShadow: "0 0 6px rgba(254,188,46,0.4)" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28C840", boxShadow: "0 0 6px rgba(40,200,64,0.4)" }} />
        </div>
        {title && (
          <span
            className="text-xs font-mono ml-1 flex-1 text-center"
            style={{ color: "var(--term-title)" }}
          >
            {title}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5" style={{ fontFamily: "var(--app-font-mono)", color: "var(--t2)" }}>
        {children}
      </div>
    </div>
  );
}

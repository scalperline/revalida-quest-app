
import { Link } from "react-router-dom";
import React from "react";

// Card de destaque das funcionalidades principais
export function FeatureCard({ title, description, icon, to }: { title: string, description: string, icon: React.ReactNode, to: string }) {
  return (
    <Link to={to} className="flex-1 bg-card shadow border rounded-xl px-6 py-7 flex flex-col items-center gap-3 hover:scale-105 transition-transform hover:ring-2 hover:ring-primary/40 text-center min-w-[220px]">
      {icon}
      <h2 className="text-lg md:text-xl font-semibold mb-1">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Link>
  );
}

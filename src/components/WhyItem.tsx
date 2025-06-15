
import React from "react";

// Features extras da primeira seção "por que usar"
export function WhyItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3 bg-muted/70 rounded-lg px-5 py-4">
      <div>{icon}</div>
      <div>
        <div className="font-semibold text-base">{title}</div>
        <div className="text-muted-foreground text-sm">{desc}</div>
      </div>
    </div>
  );
}

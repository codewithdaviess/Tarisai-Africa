"use client";

import type { ReactNode } from "react";

import { trackEvent, type ResearchEventName } from "@/lib/research/trackEvent";

type ResearchContactLinkProps = {
  href: string;
  eventName: Extract<
    ResearchEventName,
    "whatsapp_clicked" | "phone_clicked" | "email_clicked"
  >;
  className?: string;
  children: ReactNode;
};

export default function ResearchContactLink({
  href,
  eventName,
  className,
  children,
}: ResearchContactLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        void trackEvent({
          eventName,
          page: window.location.pathname,
        });
      }}
    >
      {children}
    </a>
  );
}
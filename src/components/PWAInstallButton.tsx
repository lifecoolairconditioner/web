"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      if ("prompt" in event && "userChoice" in event) {
        event.preventDefault();
        setDeferredPrompt(event as BeforeInstallPromptEvent);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    if (deferredPrompt) {
      const timer = setTimeout(() => {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
          setDeferredPrompt(null);
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [deferredPrompt]);

  if (pathname !== "/") {
    return null;
  }

  return null;
}

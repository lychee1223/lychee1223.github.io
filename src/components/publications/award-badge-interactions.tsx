"use client";

import { useEffect } from "react";

export function AwardBadgeInteractions() {
  useEffect(() => {
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    let activeBadge: HTMLElement | null = null;
    let activeStartedAt = 0;
    let resetTimeoutId: number | null = null;

    function getAwardBadge(target: EventTarget | null) {
      if (!(target instanceof Element)) {
        return null;
      }

      return target.closest<HTMLElement>(".award-badge");
    }

    function clearActiveBadge(delay = 0) {
      if (resetTimeoutId) {
        window.clearTimeout(resetTimeoutId);
        resetTimeoutId = null;
      }

      if (delay > 0) {
        resetTimeoutId = window.setTimeout(() => {
          activeBadge?.classList.remove("award-badge-touch-active");
          activeBadge = null;
          resetTimeoutId = null;
        }, delay);
        return;
      }

      activeBadge?.classList.remove("award-badge-touch-active");
      activeBadge = null;
    }

    function handleAwardBadgePointerDown(event: PointerEvent) {
      if (finePointerQuery.matches) {
        return;
      }

      const badge = getAwardBadge(event.target);

      if (!badge) {
        return;
      }

      clearActiveBadge();
      activeBadge = badge;
      activeStartedAt = window.performance.now();
      activeBadge.classList.add("award-badge-touch-active");
    }

    function handleAwardBadgePointerEnd() {
      if (!activeBadge) {
        return;
      }

      const elapsed = window.performance.now() - activeStartedAt;
      clearActiveBadge(Math.max(0, 140 - elapsed));
    }

    function handleAwardBadgeContextMenu(event: MouseEvent) {
      if (!getAwardBadge(event.target)) {
        return;
      }

      event.preventDefault();
      clearActiveBadge();
    }

    document.addEventListener("pointerdown", handleAwardBadgePointerDown);
    document.addEventListener("pointerup", handleAwardBadgePointerEnd);
    document.addEventListener("pointercancel", handleAwardBadgePointerEnd);
    document.addEventListener("touchend", handleAwardBadgePointerEnd);
    document.addEventListener("touchcancel", handleAwardBadgePointerEnd);
    document.addEventListener("contextmenu", handleAwardBadgeContextMenu);

    return () => {
      if (resetTimeoutId) {
        window.clearTimeout(resetTimeoutId);
      }

      activeBadge?.classList.remove("award-badge-touch-active");
      document.removeEventListener("pointerdown", handleAwardBadgePointerDown);
      document.removeEventListener("pointerup", handleAwardBadgePointerEnd);
      document.removeEventListener("pointercancel", handleAwardBadgePointerEnd);
      document.removeEventListener("touchend", handleAwardBadgePointerEnd);
      document.removeEventListener("touchcancel", handleAwardBadgePointerEnd);
      document.removeEventListener("contextmenu", handleAwardBadgeContextMenu);
    };
  }, []);

  return null;
}

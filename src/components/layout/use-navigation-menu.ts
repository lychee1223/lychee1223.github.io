"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";

export function useNavigationMenu() {
  const [isPublicationsOpen, setIsPublicationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuSwiping, setIsMobileMenuSwiping] = useState(false);
  const [mobileMenuSwipeOffset, setMobileMenuSwipeOffset] = useState(0);
  const publicationsMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const shouldSuppressNextClickRef = useRef(false);
  const mobileMenuSwipeStartXRef = useRef<number | null>(null);

  useEffect(() => {
    function handleDocumentMouseDown(event: MouseEvent) {
      if (
        publicationsMenuRef.current &&
        !publicationsMenuRef.current.contains(event.target as Node)
      ) {
        setIsPublicationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsPublicationsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!shouldSuppressNextClickRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      shouldSuppressNextClickRef.current = false;
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    function closeMobileMenuFromOutsideTap(
      event: PointerEvent | globalThis.TouchEvent,
    ) {
      const target = event.target;

      if (
        target instanceof Node &&
        mobileMenuPanelRef.current?.contains(target)
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      shouldSuppressNextClickRef.current = true;
      setIsMobileMenuOpen(false);

      window.setTimeout(() => {
        shouldSuppressNextClickRef.current = false;
      }, 700);
    }

    const pointerOptions: AddEventListenerOptions = { capture: true };
    const touchOptions: AddEventListenerOptions = {
      capture: true,
      passive: false,
    };

    document.addEventListener(
      "pointerdown",
      closeMobileMenuFromOutsideTap,
      pointerOptions,
    );
    document.addEventListener(
      "touchstart",
      closeMobileMenuFromOutsideTap,
      touchOptions,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeMobileMenuFromOutsideTap,
        pointerOptions,
      );
      document.removeEventListener(
        "touchstart",
        closeMobileMenuFromOutsideTap,
        touchOptions,
      );
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      return;
    }

    setIsMobileMenuSwiping(false);
    setMobileMenuSwipeOffset(0);
    mobileMenuSwipeStartXRef.current = null;
  }, [isMobileMenuOpen]);

  function handleMobileMenuTouchStart(event: TouchEvent<HTMLDivElement>) {
    if (event.touches.length !== 1) {
      return;
    }

    mobileMenuSwipeStartXRef.current = event.touches[0].clientX;
    setIsMobileMenuSwiping(true);
    setMobileMenuSwipeOffset(0);
  }

  function handleMobileMenuTouchMove(event: TouchEvent<HTMLDivElement>) {
    if (!isMobileMenuSwiping || mobileMenuSwipeStartXRef.current === null) {
      return;
    }

    const deltaX = event.touches[0].clientX - mobileMenuSwipeStartXRef.current;

    if (deltaX <= 0) {
      setMobileMenuSwipeOffset(0);
      return;
    }

    setMobileMenuSwipeOffset(Math.min(deltaX, 240));
  }

  function finishMobileMenuSwipe() {
    if (!isMobileMenuSwiping) {
      return;
    }

    const shouldClose = mobileMenuSwipeOffset > 72;

    setIsMobileMenuSwiping(false);
    mobileMenuSwipeStartXRef.current = null;

    if (shouldClose) {
      setIsMobileMenuOpen(false);
      return;
    }

    setMobileMenuSwipeOffset(0);
  }

  return {
    isPublicationsOpen,
    setIsPublicationsOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMobileMenuSwiping,
    mobileMenuSwipeOffset,
    publicationsMenuRef,
    mobileMenuPanelRef,
    handleMobileMenuTouchStart,
    handleMobileMenuTouchMove,
    finishMobileMenuSwipe,
  };
}

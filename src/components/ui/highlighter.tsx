"use client";

import React, { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import { useIsMobile } from "@/hooks/use-mobile";

interface HighlighterProps {
  children: React.ReactNode;
  color?: string;
  action?: "highlight" | "underline" | "circle" | "box" | "bracket";
  type?: "highlight" | "underline" | "circle" | "box" | "bracket";
  strokeWidth?: number;
  padding?: number;
  multiline?: boolean;
  animate?: boolean;
  animationDuration?: number;
}

// Helper function to check if color is dark/black
function isDarkColor(color: string): boolean {
  if (!color) return false;
  
  // Remove # if present and convert to lowercase
  const hex = color.replace("#", "").toLowerCase();
  
  // Handle common black colors
  if (hex === "000000" || hex === "000" || color.toLowerCase() === "black") {
    return true;
  }
  
  // Handle 3-character hex codes
  let fullHex = hex;
  if (hex.length === 3) {
    fullHex = hex.split("").map(char => char + char).join("");
  }
  
  // Validate hex
  if (!/^[0-9a-f]{6}$/i.test(fullHex)) {
    return false;
  }
  
  // Convert hex to RGB
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Consider dark if luminance is less than 0.5
  return luminance < 0.5;
}

export function Highlighter({
  children,
  color = "#FFEB3B",
  action = "highlight",
  type,
  strokeWidth = 1,
  padding = 1,
  multiline = false,
  animate = true,
  animationDuration = 800,
}: HighlighterProps) {
  const elementRef = useRef<HTMLElement>(null);
  const annotationRef = useRef<any>(null);
  const isMobile = useIsMobile();

  // On mobile, swap solid highlight backgrounds for underlines (same color) so text stays readable
  const requestedType = (type || action) as HighlighterProps["action"];
  const effectiveType = isMobile && requestedType === "highlight" ? "underline" : requestedType;
  const isDark = effectiveType === "highlight" && isDarkColor(color);

  useEffect(() => {
    if (!elementRef.current) return;

    const annotation = annotate(elementRef.current, {
      type: effectiveType as any,
      color: color,
      strokeWidth: strokeWidth,
      padding: padding,
      multiline: multiline,
      animate: animate,
      animationDuration: animationDuration,
    });

    annotationRef.current = annotation;
    annotation.show();

    return () => {
      if (annotationRef.current) {
        annotationRef.current.remove();
      }
    };
  }, [color, effectiveType, strokeWidth, padding, multiline, animate, animationDuration]);

  return (
    <span 
      ref={elementRef as any} 
      className={`inline-block ${isDark ? "text-white" : ""}`}
    >
      {children}
    </span>
  );
}


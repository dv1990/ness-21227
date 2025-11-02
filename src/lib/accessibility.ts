/**
 * Accessibility Utilities for WCAG AA Compliance
 * Comprehensive helper functions for accessibility features
 */

/**
 * WCAG 2.4.6 - Headings and Labels (Level AA)
 * Generate descriptive ARIA labels for elements
 */
export const generateAriaLabel = (
  context: string,
  action: string,
  target?: string
): string => {
  const parts = [action, target, context].filter(Boolean);
  return parts.join(" - ");
};

/**
 * WCAG 1.1.1 - Non-text Content (Level A)
 * Generate descriptive alt text for images
 */
export const generateAltText = (
  imageName: string,
  context?: string,
  isDecorative?: boolean
): string => {
  if (isDecorative) return "";
  
  const cleanName = imageName
    .replace(/\.(jpg|jpeg|png|webp|svg|gif)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  
  return context ? `${cleanName} - ${context}` : cleanName;
};

/**
 * WCAG 3.3.1 - Error Identification (Level A)
 * Generate accessible error messages
 */
export const generateErrorMessage = (
  fieldName: string,
  errorType: "required" | "invalid" | "min" | "max" | "pattern",
  customMessage?: string
): string => {
  if (customMessage) return customMessage;
  
  const errorMessages: Record<typeof errorType, string> = {
    required: `${fieldName} is required`,
    invalid: `${fieldName} is invalid`,
    min: `${fieldName} is too short`,
    max: `${fieldName} is too long`,
    pattern: `${fieldName} format is incorrect`,
  };
  
  return errorMessages[errorType];
};

/**
 * WCAG 4.1.3 - Status Messages (Level AA)
 * Announce status messages to screen readers
 */
export const announceToScreenReader = (
  message: string,
  priority: "polite" | "assertive" = "polite"
): void => {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * WCAG 2.1.1 - Keyboard (Level A)
 * Trap focus within a modal or dialog
 */
export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    
    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable?.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable?.focus();
    }
  };
  
  element.addEventListener("keydown", handleKeyDown);
  firstFocusable?.focus();
  
  // Return cleanup function
  return () => {
    element.removeEventListener("keydown", handleKeyDown);
  };
};

/**
 * WCAG 1.4.3 - Contrast (Level AA)
 * Check if color contrast meets WCAG AA standards (4.5:1 for normal text)
 */
export const meetsContrastRequirement = (
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
};

/**
 * Calculate relative luminance of a color
 */
const getLuminance = (rgb: [number, number, number]): number => {
  const [r, g, b] = rgb.map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Calculate contrast ratio between two colors
 */
const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(hexToRgb(color1));
  const lum2 = getLuminance(hexToRgb(color2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Convert hex color to RGB
 */
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

/**
 * WCAG 2.4.3 - Focus Order (Level A)
 * Manage focus order in dynamic content
 */
export const manageFocusOrder = (container: HTMLElement): void => {
  const elements = container.querySelectorAll<HTMLElement>(
    '[tabindex]:not([tabindex="-1"])'
  );
  
  elements.forEach((element, index) => {
    element.setAttribute("tabindex", String(index));
  });
};

/**
 * WCAG 1.3.1 - Info and Relationships (Level A)
 * Add proper ARIA attributes to form fields
 */
export const enhanceFormField = (
  input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  label: HTMLLabelElement,
  errorElement?: HTMLElement
): void => {
  const fieldId = input.id || `field-${Math.random().toString(36).substr(2, 9)}`;
  
  input.id = fieldId;
  label.setAttribute("for", fieldId);
  
  if (input.required) {
    input.setAttribute("aria-required", "true");
    label.innerHTML = `${label.textContent}<span aria-label="required"> *</span>`;
  }
  
  if (errorElement) {
    const errorId = `${fieldId}-error`;
    errorElement.id = errorId;
    input.setAttribute("aria-describedby", errorId);
    input.setAttribute("aria-invalid", "true");
  }
};

/**
 * WCAG 2.5.3 - Label in Name (Level A)
 * Ensure button/link visible text matches accessible name
 */
export const validateLabelInName = (
  element: HTMLElement,
  visibleText: string
): boolean => {
  const accessibleName =
    element.getAttribute("aria-label") ||
    element.getAttribute("aria-labelledby") ||
    element.textContent?.trim() ||
    "";
  
  return accessibleName.toLowerCase().includes(visibleText.toLowerCase());
};

/**
 * WCAG 1.4.13 - Content on Hover or Focus (Level AA)
 * Ensure tooltips and popovers are dismissible and hoverable
 */
export const makeTooltipAccessible = (
  trigger: HTMLElement,
  tooltip: HTMLElement
): (() => void) => {
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  tooltip.id = tooltipId;
  tooltip.setAttribute("role", "tooltip");
  trigger.setAttribute("aria-describedby", tooltipId);
  
  const showTooltip = () => {
    tooltip.style.display = "block";
    announceToScreenReader(tooltip.textContent || "", "polite");
  };
  
  const hideTooltip = () => {
    tooltip.style.display = "none";
  };
  
  trigger.addEventListener("mouseenter", showTooltip);
  trigger.addEventListener("focus", showTooltip);
  trigger.addEventListener("mouseleave", hideTooltip);
  trigger.addEventListener("blur", hideTooltip);
  
  // Allow dismissing with Escape key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") hideTooltip();
  };
  document.addEventListener("keydown", handleEscape);
  
  return () => {
    trigger.removeEventListener("mouseenter", showTooltip);
    trigger.removeEventListener("focus", showTooltip);
    trigger.removeEventListener("mouseleave", hideTooltip);
    trigger.removeEventListener("blur", hideTooltip);
    document.removeEventListener("keydown", handleEscape);
  };
};

/**
 * WCAG 3.2.4 - Consistent Identification (Level AA)
 * Ensure consistent labeling across the application
 */
export const commonLabels = {
  navigation: {
    menu: "Main menu",
    skipLink: "Skip to main content",
    breadcrumb: "Breadcrumb navigation",
    pagination: "Pagination navigation",
  },
  actions: {
    close: "Close",
    open: "Open",
    expand: "Expand",
    collapse: "Collapse",
    submit: "Submit form",
    reset: "Reset form",
    search: "Search",
    filter: "Filter results",
    sort: "Sort results",
  },
  status: {
    loading: "Loading content",
    error: "Error occurred",
    success: "Success",
    warning: "Warning",
    info: "Information",
  },
};

/**
 * WCAG 3.3.2 - Labels or Instructions (Level A)
 * Provide helpful instructions for complex inputs
 */
export const addInputInstructions = (
  input: HTMLInputElement | HTMLTextAreaElement,
  instructions: string
): void => {
  const instructionId = `${input.id}-instructions`;
  const instructionElement = document.createElement("div");
  instructionElement.id = instructionId;
  instructionElement.className = "text-sm text-muted-foreground mt-1";
  instructionElement.textContent = instructions;
  
  input.parentElement?.appendChild(instructionElement);
  
  const existingDescribedBy = input.getAttribute("aria-describedby");
  const newDescribedBy = existingDescribedBy
    ? `${existingDescribedBy} ${instructionId}`
    : instructionId;
  input.setAttribute("aria-describedby", newDescribedBy);
};

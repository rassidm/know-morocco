# Feature: Text Components - Custom Text, Heading, Caption

## Metadata

- **Feature ID:** 014
- **Phase:** 3 - Core UI Components
- **Status:** Not Started
- **Estimated Time:** 30 minutes
- **Dependencies:** 002 (Theme System)

---

## Goals

Create a set of text components that provide consistent typography across the Know Morocco app. This feature includes Heading, Body, Caption, and Label text components with proper theme integration, making it easy to display text with consistent styling throughout the application.

### Acceptance Criteria

- [ ] Heading component for titles and section headers
- [ ] Body component for main content text
- [ ] Caption component for metadata and secondary text
- [ ] Label component for form labels and badges
- [ ] All components use theme typography
- [ ] i18n support via tx prop
- [ ] Custom style override supported
- [ ] Components are accessible and testable

---

## Implementation Steps

### Step 1: Create Heading Component

**File:** `app/components/text/Heading.tsx`

```typescript
import { ReactNode } from "react"
import { StyleProp, TextStyle } from "react-native"

import { Text, TextProps } from "@/components/Text"

interface HeadingProps extends Omit<TextProps, "preset" | "size" | "weight"> {
  /**
   * Heading level
   */
  level?: 1 | 2 | 3 | 4
  /**
   * Custom style override
   */
  style?: StyleProp<TextStyle>
}

const $headingStyles: Record<number, Partial<TextStyle>> = {
  1: { fontSize: 32, lineHeight: 40, fontWeight: "700" },
  2: { fontSize: 28, lineHeight: 36, fontWeight: "700" },
  3: { fontSize: 24, lineHeight: 32, fontWeight: "600" },
  4: { fontSize: 20, lineHeight: 28, fontWeight: "600" },
}

/**
 * Heading Component - For titles and section headers
 */
export function Heading({
  level = 1,
  style,
  ...rest
}: HeadingProps) {
  return (
    <Text
      preset="heading"
      weight="bold"
      size={level <= 2 ? "xxl" : "xl"}
      style={[$headingStyles[level], style]}
      {...rest}
    />
  )
}
```

---

### Step 2: Create Body Component

**File:** `app/components/text/Body.tsx`

```typescript
import { StyleProp, TextStyle } from "react-native"

import { Text, TextProps } from "@/components/Text"

interface BodyProps extends Omit<TextProps, "preset" | "size" | "weight"> {
  /**
   * Body variant
   */
  variant?: "large" | "default" | "small"
  /**
   * Whether text is secondary (muted color)
   */
  secondary?: boolean
  /**
   * Custom style override
   */
  style?: StyleProp<TextStyle>
}

const $bodyStyles: Record<string, Partial<TextStyle>> = {
  large: { fontSize: 18, lineHeight: 26 },
  default: { fontSize: 16, lineHeight: 24 },
  small: { fontSize: 14, lineHeight: 20 },
}

/**
 * Body Component - For main content text
 */
export function Body({
  variant = "default",
  secondary,
  style,
  ...rest
}: BodyProps) {
  return (
    <Text
      preset="default"
      weight="regular"
      size="md"
      color={secondary ? "textDim" : undefined}
      style={[$bodyStyles[variant], style]}
      {...rest}
    />
  )
}
```

---

### Step 3: Create Caption Component

**File:** `app/components/text/Caption.tsx`

```typescript
import { StyleProp, TextStyle } from "react-native"

import { Text, TextProps } from "@/components/Text"

interface CaptionProps extends Omit<TextProps, "preset" | "size" | "weight"> {
  /**
   * Custom style override
   */
  style?: StyleProp<TextStyle>
}

/**
 * Caption Component - For metadata and secondary text
 */
export function Caption({ style, ...rest }: CaptionProps) {
  return (
    <Text
      preset="formHelper"
      weight="regular"
      size="sm"
      color="textDim"
      style={[
        {
          fontSize: 12,
          lineHeight: 18,
        },
        style,
      ]}
      {...rest}
    />
  )
}
```

---

### Step 4: Create Label Component

**File:** `app/components/text/Label.tsx`

```typescript
import { StyleProp, TextStyle } from "react-native"

import { Text, TextProps } from "@/components/Text"

interface LabelProps extends Omit<TextProps, "preset" | "size" | "weight"> {
  /**
   * Label variant
   */
  variant?: "default" | "badge"
  /**
   * Custom style override
   */
  style?: StyleProp<TextStyle>
}

/**
 * Label Component - For form labels and badges
 */
export function Label({ variant = "default", style, ...rest }: LabelProps) {
  const isBadge = variant === "badge"

  return (
    <Text
      preset="formLabel"
      weight="medium"
      size="sm"
      style={[
        {
          fontSize: 14,
          lineHeight: 20,
          textTransform: isBadge ? "uppercase" : undefined,
          letterSpacing: isBadge ? 0.5 : undefined,
        },
        style,
      ]}
      {...rest}
    />
  )
}
```

---

### Step 5: Create Text Components Barrel Export

**File:** `app/components/text/index.ts`

```typescript
export { Heading } from "./Heading"
export { Body } from "./Body"
export { Caption } from "./Caption"
export { Label } from "./Label"
```

---

## Mock Data

No mock data needed for this feature.

---

## Integration Points

### Connects To

- **Feature 002** - Uses theme system for typography and colors

### Used By

- **Feature 010** - Login Screen (title, subtitle)
- **Feature 015** - Card Components (card text)
- **Feature 024** - Home Screen (headings and body text)
- **Feature 054** - Profile Screen (labels and captions)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Heading renders with correct sizes for all levels
- [ ] Body renders with proper line height
- [ ] Body secondary variant uses muted color
- [ ] Caption renders with small font size and muted color
- [ ] Label renders with medium weight
- [ ] Label badge variant uses uppercase
- [ ] All components support tx prop for i18n
- [ ] Custom styles can override defaults

---

## Notes

- Existing Text component from Ignite boilerplate can be extended
- Consider adding semantic HTML-like roles for accessibility
- All text components should support dynamic font sizing in the future
- Line heights should be carefully chosen to prevent text clipping

---

## References

- [React Native Text](https://reactnative.dev/docs/text)
- [Typography Best Practices](https://material.io/design/typography/)
- [Feature 002 - Theme System](./002-theme-system.md)

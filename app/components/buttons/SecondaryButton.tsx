import { BaseButton, ButtonProps } from "./BaseButton"

interface SecondaryButtonProps extends Omit<ButtonProps, "variant"> {}

/**
 * Secondary Button - Alternative actions
 * Used for secondary actions that are less prominent than the primary action
 */
export function SecondaryButton(props: SecondaryButtonProps) {
  return <BaseButton variant="secondary" {...props} />
}

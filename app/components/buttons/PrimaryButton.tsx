import { BaseButton, ButtonProps } from "./BaseButton"

interface PrimaryButtonProps extends Omit<ButtonProps, "variant"> {}

/**
 * Primary Button - Main call-to-action
 * Used for the most important action on a screen
 */
export function PrimaryButton(props: PrimaryButtonProps) {
  return <BaseButton variant="primary" {...props} />
}

import { BaseButton, ButtonProps } from "./BaseButton"

interface OutlineButtonProps extends Omit<ButtonProps, "variant"> {}

/**
 * Outline Button - Less prominent actions
 * Used for actions that need to be visible but not emphasized
 */
export function OutlineButton(props: OutlineButtonProps) {
  return <BaseButton variant="outline" {...props} />
}

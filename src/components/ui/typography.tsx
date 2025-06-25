
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        h1: "text-hero font-bold tracking-tight",
        h2: "text-subtitle font-semibold tracking-tight",
        h3: "text-xl font-semibold tracking-tight",
        h4: "text-lg font-medium",
        p: "text-body leading-relaxed",
        subtitle: "text-subtitle text-muted-foreground",
        caption: "text-caption text-muted-foreground",
        label: "text-sm font-medium",
        button: "text-sm font-medium",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        gradient: "bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      variant: "p",
      color: "default",
      align: "left",
    },
  }
)

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean
  as?: keyof JSX.IntrinsicElements
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, color, align, asChild = false, as, ...props }, ref) => {
    const Comp = asChild ? Slot : (as || getDefaultElement(variant))
    
    return (
      <Comp
        className={cn(typographyVariants({ variant, color, align, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

function getDefaultElement(variant: TypographyProps["variant"]) {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "subtitle":
    case "caption":
    case "p":
      return "p"
    case "label":
      return "label"
    case "button":
      return "span"
    default:
      return "p"
  }
}

Typography.displayName = "Typography"

export { Typography, typographyVariants }

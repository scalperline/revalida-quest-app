
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const responsiveCardVariants = cva(
  "responsive-card smooth-transition hover-lift focus-ring",
  {
    variants: {
      size: {
        sm: "responsive-card-sm",
        default: "",
        lg: "responsive-card-lg",
      },
      variant: {
        default: "bg-card border-border",
        gradient: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800",
        feature: "bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-blue-100 dark:border-gray-700",
        highlight: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-2xl",
      },
      clickable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      clickable: false,
    },
  }
)

export interface ResponsiveCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof responsiveCardVariants> {
  asChild?: boolean
}

const ResponsiveCard = React.forwardRef<HTMLDivElement, ResponsiveCardProps>(
  ({ className, size, variant, clickable, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    
    return (
      <Comp
        className={cn(responsiveCardVariants({ size, variant, clickable, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

ResponsiveCard.displayName = "ResponsiveCard"

const ResponsiveCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 mb-4", className)}
    {...props}
  />
))

ResponsiveCardHeader.displayName = "ResponsiveCardHeader"

const ResponsiveCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))

ResponsiveCardTitle.displayName = "ResponsiveCardTitle"

const ResponsiveCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-caption text-muted-foreground", className)}
    {...props}
  />
))

ResponsiveCardDescription.displayName = "ResponsiveCardDescription"

const ResponsiveCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))

ResponsiveCardContent.displayName = "ResponsiveCardContent"

const ResponsiveCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center mt-4 pt-4 border-t border-border", className)}
    {...props}
  />
))

ResponsiveCardFooter.displayName = "ResponsiveCardFooter"

export { 
  ResponsiveCard, 
  ResponsiveCardHeader,
  ResponsiveCardFooter, 
  ResponsiveCardTitle, 
  ResponsiveCardDescription, 
  ResponsiveCardContent,
  responsiveCardVariants
}

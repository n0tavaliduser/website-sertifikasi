import * as React from "react"
import { cn } from "@/lib/utils"

const Spinner = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900", className)}
      {...props}
    />
  )
})

Spinner.displayName = "Spinner"

export { Spinner } 
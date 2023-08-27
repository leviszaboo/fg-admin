"use client"
 
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import selectFeaturedStore from "@/app/hooks/selectFeatured"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
const options = [
  {
    value: "vertical",
    label: "Vertical",
  },
  {
    value: "horizontal",
    label: "Horizontal",
  },
]
 
export default function ComboBox() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("vertical")
  const { setIsVerticalSelected } = selectFeaturedStore()
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-36 justify-between border-input"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setIsVerticalSelected(currentValue === "vertical" ? true : false)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
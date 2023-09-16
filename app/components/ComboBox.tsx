"use client"
 
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import useSelectImagesStore from "@/app/hooks/UseSelectImages"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboBoxOptions {
  value: string,
  label: string
}

interface ComboBoxProps {
  optionsList: ComboBoxOptions[],
  onSelect(value: string): void
}
 
export default function ComboBox({ optionsList, onSelect }: ComboBoxProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(optionsList[0].value)
 
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
            ? optionsList.find((option) => option.value === value)?.label
            : "Select"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0">
        <Command>
          <CommandGroup>
            {optionsList.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  onSelect(currentValue);
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
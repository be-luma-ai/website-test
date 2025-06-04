"use client"

// components/date-range-picker.tsx

import { useState } from "react"

type Props = {
  startDate: string | undefined
  endDate: string | undefined
  onChange: (start: string, end: string) => void
}

export default function DateRangePicker({ startDate, endDate, onChange }: Props) {
  const [localStart, setLocalStart] = useState(startDate || "")
  const [localEnd, setLocalEnd] = useState(endDate || "")

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex flex-col">
        <label className="text-muted-foreground">Desde</label>
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={localStart}
          onChange={(e) => {
            setLocalStart(e.target.value)
            if (localEnd) onChange(e.target.value, localEnd)
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-muted-foreground">Hasta</label>
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={localEnd}
          onChange={(e) => {
            setLocalEnd(e.target.value)
            if (localStart) onChange(localStart, e.target.value)
          }}
        />
      </div>
    </div>
  )
}

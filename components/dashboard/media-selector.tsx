"use client"

// components/media-selector.tsx

type Props = {
  value: "meta_ads" | "google_ads" | "all"
  onChange: (value: "meta_ads" | "google_ads" | "all") => void
}

export default function MediaSelector({ value, onChange }: Props) {
  const options = [
    { label: "Todos los medios", value: "all" },
    { label: "Google Ads", value: "google_ads" },
    { label: "Meta Ads", value: "meta_ads" },
  ]

  return (
    <div className="flex space-x-2 mb-4">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`px-4 py-1 rounded-full border text-sm ${
            value === opt.value ? "bg-black text-white border-black" : "bg-white text-black border-gray-300"
          }`}
          onClick={() => onChange(opt.value as any)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INDUSTRY_OPTIONS } from "@/lib/constants";
import { useSignupContext } from "@/components/providers/signup-context";

export default function StepCompany() {
  const { formData, updateFormData } = useSignupContext();

  const handleChange = (
    field: "name" | "company" | "industry",
    value: string
  ) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Tu nombre</Label>
        <Input
          placeholder="Juan Pérez"
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div>
        <Label>Empresa</Label>
        <Input
          placeholder="GAMA S.A."
          value={formData.company || ""}
          onChange={(e) => handleChange("company", e.target.value)}
        />
      </div>
      <div>
        <Label>Industria</Label>
        <select
          value={formData.industry || ""}
          onChange={(e) => handleChange("industry", e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">Seleccionar</option>
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useSignupContext } from "@/components/providers/signup-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    description: "Hasta $1M/año de ad spend. Meta & Google.",
    price: "$499 USD/mes",
  },
  {
    id: "pro",
    name: "Professional",
    description: "Hasta $10M/año. Todas las plataformas.",
    price: "$1.999 USD/mes",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "+10M/año. Planes custom.",
    price: "Custom",
  },
];

export default function StepPlan({
  next,
  back,
}: {
  next: () => void;
  back: () => void;
}) {
  const { formData, updateFormData } = useSignupContext();
  const [selectedPlan, setSelectedPlan] = useState(formData.plan || "");

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
    updateFormData({ plan: planId });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">
        Elegí el plan que mejor se adapte a vos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer border ${
              selectedPlan === plan.id ? "ring-2 ring-purple-600" : ""
            } transition`}
            onClick={() => handleSelect(plan.id)}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{plan.description}</p>
              <p className="mt-2 text-lg font-semibold">{plan.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={back}>
          Atrás
        </Button>
        {selectedPlan && <Button onClick={next}>Continuar</Button>}
      </div>
    </div>
  );
}

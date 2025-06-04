// components/modals/SignupFlowModal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/components/providers/auth-modal-context";
import StepAuth from "./StepAuth";
import StepCompany from "./StepCompany";
import StepPlan from "./StepPlan";
import StepPayment from "./StepPayment";
//import StepIDs from "./StepIDs"; 
import { useSession } from "next-auth/react";
import { SignupProvider } from "@/components/providers/signup-context"; // ✅ USAR PROVIDER

const STEPS = ["auth", "company", "plan", "payment", "ids"] as const;
type StepType = (typeof STEPS)[number];

export default function SignupFlowModal() {
  const { isSignupOpen, closeSignup } = useModal();
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const { data: session } = useSession();

  const next = () => {
    if (!isLast) setStepIndex((prev) => prev + 1);
  };

  const back = () => {
    if (stepIndex > 0) setStepIndex((prev) => prev - 1);
  };

  return (
    <SignupProvider>
      {" "}
      {/* ✅ ENVUELTO EN PROVIDER */}
      <Dialog open={isSignupOpen} onOpenChange={closeSignup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrarse en BeLuma</DialogTitle>
          </DialogHeader>

          {step === "auth" && <StepAuth />}
          {step === "company" && <StepCompany />}
          {step === "plan" && <StepPlan />}
          {step === "payment" && <StepPayment />}
          {/* {step === "ids" && <StepIDs />} */}
        </DialogContent>
      </Dialog>
    </SignupProvider>
  );
}

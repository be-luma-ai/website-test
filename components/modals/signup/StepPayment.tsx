"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignupContext } from "@/components/providers/signup-context";
import { auth } from "@/lib/firebase";
import { getIdToken } from "firebase/auth";
import { saveClient } from "@/api/client";
import { useRouter } from "next/navigation";

export default function StepPayment() {
  const [cardholderName, setCardholderName] = useState("");
  const [loading, setLoading] = useState(false);
  const { formData, updateFormData } = useSignupContext();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulamos que el usuario ingresó los datos de pago correctamente
      updateFormData({ cardholderName });

      // Obtenemos el token de Firebase para autorizar la llamada
      const user = auth.currentUser;
      if (!user) throw new Error("Usuario no autenticado");

      const token = await getIdToken(user);

      // Guardamos el cliente en el backend
      await saveClient({ ...formData, cardholderName }, token);

      // Redirigimos al dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Error al guardar cliente:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2">Agregá una tarjeta</h2>
      <Input
        placeholder="Nombre del titular"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
      />
      <Button onClick={handleSubmit} className="w-full" disabled={loading}>
        {loading ? "Guardando..." : "Finalizar registro"}
      </Button>
    </div>
  );
}

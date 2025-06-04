import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StepAuth({ onContinue, saveData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const currentUser = auth.currentUser;
      if (currentUser) saveData({ email: currentUser.email });
      onContinue();
    } catch (error) {
      setError("Error en login con Google");
    }
  };

  const handleNext = async () => {
    if (!email) return;

    if (password && password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      saveData({ email });
      onContinue();
    } catch (err: any) {
      setError(err.message || "Error en registro");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Autenticación</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Contraseña (opcional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex flex-col gap-2">
        <Button onClick={handleNext}>Registrarse con email</Button>
        <Button variant="outline" onClick={handleGoogle}>
          Registrarse con Google
        </Button>
      </div>
    </div>
  );
}

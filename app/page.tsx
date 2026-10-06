import { redirect } from "next/navigation";
import { obtenerPerfil } from "@/lib/perfil";

// La raíz manda a cada usuario a la pantalla de su rol.
export default async function Inicio() {
  const perfil = await obtenerPerfil();
  redirect(`/${perfil.rol}`);
}

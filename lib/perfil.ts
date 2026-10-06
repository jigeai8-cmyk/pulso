import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Rol = "vendedor" | "gerente";

export type Perfil = {
  id: string;
  nombre: string | null;
  email: string | null;
  rol: Rol;
};

// Devuelve el perfil del usuario logueado. Si no hay sesión, manda a /login.
export async function obtenerPerfil(): Promise<Perfil> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: perfil } = await supabase
    .from("profiles")
    .select("id, nombre, email, rol")
    .eq("id", user.id)
    .single();

  if (!perfil) redirect("/login?error=sin-perfil");

  return perfil as Perfil;
}

// Protege una página: si el rol no coincide, lo manda a su propia pantalla.
export async function exigirRol(rol: Rol): Promise<Perfil> {
  const perfil = await obtenerPerfil();
  if (perfil.rol !== rol) redirect(`/${perfil.rol}`);
  return perfil;
}

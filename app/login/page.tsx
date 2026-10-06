import { iniciarSesion } from "./actions";
import { Marca } from "../logo";

const mensajes: Record<string, string> = {
  credenciales: "El email o la contraseña no coinciden. Revisalos e intentá de nuevo.",
  "sin-perfil": "Tu usuario existe pero no tiene perfil asignado. Pedile a RRHH que lo revise.",
};

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="acceso">
      <div className="acceso-caja">
        <Marca />
        <h1>Iniciar sesión</h1>
        <p>Entrá con el usuario que te dio tu empresa.</p>

        {error && <div className="error" role="alert">{mensajes[error] ?? "No se pudo iniciar sesión."}</div>}

        <form action={iniciarSesion}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </main>
  );
}

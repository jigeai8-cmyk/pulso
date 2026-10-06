import { Marca } from "./logo";
import type { Perfil } from "@/lib/perfil";

export function Barra({ perfil }: { perfil: Perfil }) {
  return (
    <header className="barra">
      <Marca />
      <div className="barra-derecha">
        <span>{perfil.nombre ?? perfil.email}</span>
        <form action="/auth/signout" method="post">
          <button type="submit">Cerrar sesión</button>
        </form>
      </div>
    </header>
  );
}

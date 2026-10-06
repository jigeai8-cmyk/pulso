import { exigirRol } from "@/lib/perfil";
import { createClient } from "@/lib/supabase/server";
import { Barra } from "../barra";

export default async function PanelGerente() {
  const perfil = await exigirRol("gerente");
  const supabase = await createClient();

  // Gracias a las políticas RLS, sólo un gerente puede leer todos los perfiles.
  const { data: equipo } = await supabase
    .from("profiles")
    .select("id, nombre, email, rol")
    .eq("rol", "vendedor")
    .order("nombre");

  return (
    <>
      <Barra perfil={perfil} />
      <main className="contenido">
        <span className="rol">Gerente</span>
        <h1>Tu equipo comercial</h1>
        <p className="subtitulo">Desempeño y motivación de cada vendedor.</p>

        <h2>Vendedores ({equipo?.length ?? 0})</h2>
        <div className="tabla-envoltura">
          {equipo && equipo.length > 0 ? (
            <table>
              <thead>
                <tr><th>Nombre</th><th>Email</th><th>Ventas del Q</th><th>Motivación</th></tr>
              </thead>
              <tbody>
                {equipo.map((v) => (
                  <tr key={v.id}>
                    <td>{v.nombre}</td>
                    <td>{v.email}</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="vacio">Todavía no hay vendedores. Creá usuarios en Supabase y van a aparecer acá.</p>
          )}
        </div>
      </main>
    </>
  );
}

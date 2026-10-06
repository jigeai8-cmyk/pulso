import { exigirRol } from "@/lib/perfil";
import { Barra } from "../barra";

export default async function PanelVendedor() {
  const perfil = await exigirRol("vendedor");

  return (
    <>
      <Barra perfil={perfil} />
      <main className="contenido">
        <span className="rol">Vendedor</span>
        <h1>Hola, {perfil.nombre ?? "vendedor"}</h1>
        <p className="subtitulo">Tu desempeño de este trimestre y tu encuesta semanal.</p>

        {/* Valores de ejemplo: en la próxima etapa vienen de HubSpot y de las encuestas. */}
        <div className="metricas">
          <div className="metrica"><span>Ventas cerradas</span><strong>—</strong><small>Se conecta con el CRM</small></div>
          <div className="metrica"><span>Oportunidades abiertas</span><strong>—</strong><small>Se conecta con el CRM</small></div>
          <div className="metrica"><span>Oportunidades perdidas</span><strong>—</strong><small>Se conecta con el CRM</small></div>
          <div className="metrica"><span>Encuesta de la semana</span><strong>Pendiente</strong><small>Próximamente</small></div>
        </div>
      </main>
    </>
  );
}

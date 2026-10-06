// Marca provisoria: una línea de pulso.
export function Marca() {
  return (
    <div className="marca">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <rect width="28" height="28" rx="7" fill="#1f6f5c" />
        <path d="M4 15h5l2.5-6 4 11 2.5-5H24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Pulso
    </div>
  );
}

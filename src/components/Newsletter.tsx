import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: conectar con tu proveedor de email (Brevo, Mailerlite, ConvertKit...)
    setSent(true);
  };

  return (
    <section className="rounded-2xl bg-brand-900 px-6 py-10 text-center text-white">
      <h2 className="text-2xl font-bold">Recibe la mejor oferta de belleza cada semana</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-brand-100">
        Sin spam. Analizamos precios y bajadas reales en Mercado Libre para avisarte solo cuando merece la pena.
      </p>
      {sent ? (
        <p className="mt-6 font-medium text-emerald-300">¡Listo! Revisa tu bandeja de entrada para confirmar.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-sm gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-lg border-0 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Suscribirme
          </button>
        </form>
      )}
    </section>
  );
}

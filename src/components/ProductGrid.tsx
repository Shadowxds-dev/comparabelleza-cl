import { useMemo, useState } from "react";
import type { Product, ProductTier, ProductType } from "../types";
import { formatCLP } from "../utils/format";

const GRADIENTS: Record<ProductTier, string> = {
  economica: "from-emerald-400 to-teal-600",
  media: "from-brand-400 to-brand-700",
  premium: "from-ink-700 to-ink-900",
  profesional: "from-fuchsia-500 to-purple-800",
};

const TIER_LABELS: Record<ProductTier, string> = {
  economica: "Económica",
  media: "Gama media",
  premium: "Premium",
  profesional: "Profesional",
};

const ICON_PATHS: Record<ProductType, string> = {
  secador: "M14 22a14 14 0 1 1 28 0c0 4-2 7-6 9l-4 3v12h-8V34l-4-3c-4-2-6-5-6-9Z",
  plancha: "M12 18h32v10H12z M16 28l4 22h16l4-22",
  depiladora: "M27 6h10v30h-10z M23 36h18v20h-18z",
  facial: "M32 10a22 22 0 1 0 0.1 0Z M32 22a10 10 0 1 0 0.1 0Z",
};

function Stars({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.min(1, Math.max(0, rating - i));
          return (
            <div key={i} className="relative h-3.5 w-3.5">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-ink-200" fill="currentColor">
                <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5Z" />
              </svg>
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-amber-400" fill="currentColor">
                  <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5Z" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <span className="text-sm font-medium text-ink-700">{rating.toFixed(1)}</span>
      <span className="text-xs text-ink-400">({reviewCount.toLocaleString("es-CL")})</span>
    </div>
  );
}

const SORTS = [
  { value: "popular", label: "Más populares" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
] as const;

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  const [sort, setSort] = useState<(typeof SORTS)[number]["value"]>("popular");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [products, sort]);

  return (
    <div>
      <div className="flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700"
          aria-label="Ordenar productos"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <a href={`/producto/${product.slug}/`} className="block">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-white">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-full w-full object-contain p-3" loading="lazy" />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${GRADIENTS[product.tier]}`}>
                    <svg viewBox="0 0 64 64" className="h-1/2 w-1/2 text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d={ICON_PATHS[product.type]} strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                  {TIER_LABELS[product.tier]}
                </span>
              </div>
            </a>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-brand-600">{product.brand}</div>
              <a href={`/producto/${product.slug}/`} className="font-semibold text-ink-900 hover:text-brand-600">
                {product.name}
              </a>
              <Stars rating={product.rating} reviewCount={product.reviewCount} />
              <p className="line-clamp-2 text-sm text-ink-500">{product.idealFor}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-ink-900">{formatCLP(product.price)}</span>
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="rounded-lg bg-brand-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  Ver en Mercado Libre
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

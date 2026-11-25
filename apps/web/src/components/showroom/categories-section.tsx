import Link from 'next/link'
import { FadeContent } from '@/components/showroom/fade-content'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export function CategoriesSection({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null

  return (
    <section className="section-pad bg-ink">
      <div className="page-container">
        <FadeContent>
          <p className="eyebrow">Explore by character</p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-normal leading-[1.1] tracking-[-0.03em] text-primary sm:text-4xl">
            Every drive has a shape.
          </h2>
        </FadeContent>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <FadeContent key={category.id} delay={index * 0.08}>
              <Link
                href={`/category/${category.slug}`}
                className="focus-ring group flex h-full flex-col border border-hairline bg-card p-6 transition-colors duration-[400ms] ease-out hover:border-gold/40"
              >
                <span className="text-[11px] tracking-[0.2em] text-muted/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-10 font-display text-2xl font-normal leading-tight text-primary transition-colors duration-300 group-hover:text-gold">
                  {category.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {category.description || 'Explore vehicles in this collection.'}
                </p>
                <span className="mt-auto pt-10 text-[11px] uppercase tracking-[0.2em] text-muted/70 group-hover:text-gold">
                  Explore →
                </span>
              </Link>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}

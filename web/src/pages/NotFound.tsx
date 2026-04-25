import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <section className="flex min-h-screen items-center bg-transparent px-6 py-20 md:px-10 lg:px-16">
      <div className="neo-panel mx-auto w-full max-w-3xl bg-pink p-8 md:p-10">
        <p className="terminal text-xs uppercase tracking-[0.18em] text-accent2">Route Exception</p>
        <h1 className="mt-3 font-heading text-4xl font-black uppercase tracking-[-0.03em] text-ink md:text-6xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm text-ink/80 md:text-base">
          The requested host path is unavailable in this environment. Return to the main SOC
          dashboard to continue.
        </p>

        <div className="neo-card terminal mt-8 bg-paper px-4 py-4 text-sm md:text-base">
          <p className="text-accent">ERROR 404 // HOST NOT FOUND</p>
          <p className="mt-2 text-accent2">&gt; ping target... request timed out</p>
        </div>

        <button
          type="button"
          className="neo-button mt-8 inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-paper"
          onClick={() => navigate('/')}
        >
          Return Home
        </button>
      </div>
    </section>
  )
}

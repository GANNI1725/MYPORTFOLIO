import SEO from '../components/SEO'

export default function ServerError() {
  return (
    <>
      <SEO
        title="500 — Server Error"
        description="Something went wrong on our end. Please try again later."
        path="/500"
      />
      <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg)]">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-8xl md:text-9xl font-black text-accent/15 select-none reveal-up">
            500
          </div>

          <div className="reveal-up" style={{ animationDelay: '0.15s' }}>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Something Went Wrong</h1>
            <p className="text-secondary text-sm leading-relaxed mt-3">
              An unexpected error occurred on our end. Please try refreshing the page, or come back
              later. We apologize for the inconvenience.
            </p>
          </div>

          <div className="reveal-up flex flex-col sm:flex-row items-center justify-center gap-3" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex h-11 px-6 items-center justify-center rounded-xl bg-accent text-white text-sm font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transition-all hover:scale-105 active:scale-95"
            >
              Refresh Page
            </button>
            <a
              href="/"
              className="inline-flex h-11 px-6 items-center justify-center rounded-xl border border-[var(--border)] text-primary text-sm font-semibold hover:bg-white/5 transition-all"
            >
              Back to Home
            </a>
          </div>

          <p className="reveal-up text-[10px] text-secondary/40 mt-8" style={{ animationDelay: '0.45s' }}>
            Error 500 — Internal Server Error
          </p>
        </div>
      </div>
    </>
  )
}

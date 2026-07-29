import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg)]">
          <div className="text-center space-y-6 max-w-md">
            <div className="text-7xl font-black text-accent/20 select-none">500</div>
            <h1 className="text-2xl font-bold text-primary">Something went wrong</h1>
            <p className="text-secondary text-sm leading-relaxed">
              An unexpected error occurred. Please try refreshing the page, or come back later.
            </p>
            <a
              href="/"
              className="inline-flex h-11 px-6 items-center justify-center rounded-xl bg-accent text-white text-sm font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transition-all"
            >
              Back to Home
            </a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

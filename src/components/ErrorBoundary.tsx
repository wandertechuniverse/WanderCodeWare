import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-luxury-50 dark:bg-luxury-950">
          <h1 className="font-serif text-2xl text-luxury-900 dark:text-luxury-50">
            Something went wrong
          </h1>
          <p className="text-sm font-light text-luxury-500 max-w-sm">
            An unexpected error occurred. Please reload the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="border border-luxury-300 dark:border-luxury-700 px-8 py-3 text-[11px] tracking-widest uppercase text-luxury-900 dark:text-luxury-50 hover:bg-luxury-100 dark:hover:bg-luxury-900 transition-colors"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

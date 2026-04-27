import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('JamZia ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
          <p className="text-sm text-[#A0AEC0] mb-6 max-w-md text-center">
            The JamZia platform encountered an error. This has been logged.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#F7F2EB] text-black font-bold rounded-xl hover:scale-[1.02] transition-transform"
          >
            Reload Platform
          </button>
          {this.state.error && (
            <pre className="mt-6 text-xs text-[#6B7280] bg-[#0A0F1E] p-4 rounded-xl max-w-lg overflow-auto">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#05110c] text-white p-6 z-50">
          <div className="max-w-md w-full bg-[#08221a] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-2xl">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-emerald-300">Display Interrupted</h2>
            <p className="text-xs text-emerald-100/70">
              A temporary display error occurred while rendering the globe or overlay layer.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
            >
              Reload Map View
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

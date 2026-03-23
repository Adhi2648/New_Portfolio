import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
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
    console.error("Uncaught setup error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
          <div className="p-8 max-w-lg text-center bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-black text-red-500 mb-4">Something went wrong</h2>
            <p className="text-slate-400 mb-6">We've encountered an unexpected error. Trying to recover...</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

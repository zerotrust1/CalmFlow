import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              padding: "20px",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "500px",
              }}
            >
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "#6b7280",
                  marginBottom: "12px",
                }}
              >
                Something went wrong
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#9ca3af",
                  marginBottom: "16px",
                  lineHeight: 1.6,
                }}
              >
                We encountered an unexpected error. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "10px 24px",
                  background: "rgba(148, 180, 148, 0.6)",
                  border: "1px solid rgba(201, 218, 211, 0.4)",
                  borderRadius: "16px",
                  color: "#6b7280",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(148, 180, 148, 0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(148, 180, 148, 0.6)";
                }}
              >
                Refresh Page
              </button>
              {process.env.NODE_ENV === "development" && (
                <details
                  style={{
                    marginTop: "24px",
                    padding: "12px",
                    background: "rgba(0, 0, 0, 0.04)",
                    borderRadius: "8px",
                    textAlign: "left",
                  }}
                >
                  <summary style={{ cursor: "pointer", fontWeight: 600 }}>
                    Error Details (Dev Only)
                  </summary>
                  <pre
                    style={{
                      marginTop: "12px",
                      fontSize: "12px",
                      overflow: "auto",
                      color: "#666",
                    }}
                  >
                    {this.state.error?.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

import React, { useState, useEffect, Suspense, lazy, Component, ErrorInfo, ReactNode } from "react";

// Lazy-load floating widgets
const WebsiteFeedback = lazy(() => import("../feedback/WebsiteFeedback"));
const VoteAssistant = lazy(() =>
  import("../ai/VoteAssistant").then((m) => ({ default: m.VoteAssistant }))
);
const ScrollToTopButton = lazy(() => import("../ScrollToTopButton"));

interface WidgetErrorBoundaryProps {
  children: ReactNode;
}

interface WidgetErrorBoundaryState {
  hasError: boolean;
}

class WidgetErrorBoundary extends Component<WidgetErrorBoundaryProps, WidgetErrorBoundaryState> {
  public state: WidgetErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): WidgetErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.debug("SafeClientWidgets error caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

/**
 * SafeClientWidgets — mounts client-only floating widgets smoothly
 * after React hydration has completed, preventing hydration mismatch error #421.
 */
export const SafeClientWidgets: React.FC = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Defer rendering until after initial hydration tick
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          () => setCanRender(true),
          { timeout: 1000 }
        );
        return () => {
          if ("cancelIdleCallback" in window) {
            (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
          }
        };
      } else {
        const timer = setTimeout(() => setCanRender(true), 200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <WidgetErrorBoundary>
      <Suspense fallback={null}>
        <WebsiteFeedback />
        <VoteAssistant />
        <ScrollToTopButton />
      </Suspense>
    </WidgetErrorBoundary>
  );
};

export default SafeClientWidgets;

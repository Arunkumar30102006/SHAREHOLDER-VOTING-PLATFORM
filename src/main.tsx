import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

console.log("Main.tsx: Starting execution");

const rootElement = document.getElementById("root");
console.log("Main.tsx: Root element found:", !!rootElement);

if (rootElement) {
    const app = (
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    );

    const isPreRendered = rootElement.hasChildNodes() && !rootElement.querySelector('.app-loader');

    if (isPreRendered) {
        console.log("Main.tsx: Hydrating app");
        hydrateRoot(rootElement, app);
    } else {
        console.log("Main.tsx: Created root, rendering App");
        const root = createRoot(rootElement);
        root.render(app);
    }

    // Trigger prerender to capture the document after mounting
    setTimeout(() => {
        document.dispatchEvent(new Event('custom-render-trigger'));
    }, 1500); // 1.5s delay ensures dynamic content/data finishes loading before snapshot

} else {
    console.error("Main.tsx: Root element MISSING");
}

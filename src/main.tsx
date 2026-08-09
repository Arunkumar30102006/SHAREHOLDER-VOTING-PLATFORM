import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

console.log("Main.tsx: Starting execution");

const rootElement = document.getElementById("root");
console.log("Main.tsx: Root element found:", !!rootElement);

if (rootElement) {
    // Check if the DOM has been prerendered by checking if the loader is gone
    const isPrerendered = rootElement.hasChildNodes() && !rootElement.querySelector('.app-loader');

    if (isPrerendered) {
        console.log("Main.tsx: Hydrating prerendered root");
        hydrateRoot(
            rootElement,
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        );
    } else {
        console.log("Main.tsx: Created root, rendering App");
        const root = createRoot(rootElement);
        root.render(
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        );
    }
} else {
    console.error("Main.tsx: Root element MISSING");
}

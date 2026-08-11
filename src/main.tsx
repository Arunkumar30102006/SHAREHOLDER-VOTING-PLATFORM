import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);

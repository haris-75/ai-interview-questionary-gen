import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "var(--color-elevated)",
          color: "var(--color-fg)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
        success: {
          iconTheme: {
            primary: "var(--color-accent)",
            secondary: "var(--color-onaccent)",
          },
        },
        error: {
          style: {
            background: "var(--color-error-bg)",
            color: "var(--color-error-text)",
            border: "1px solid var(--color-error-border)",
          },
          iconTheme: {
            primary: "var(--color-error-icon)",
            secondary: "var(--color-error-bg)",
          },
        },
      }}
    />
  );
}

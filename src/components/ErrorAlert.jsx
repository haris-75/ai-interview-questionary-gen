const ErrorAlert = ({ message }) => (
  <div
    className="p-4 rounded-lg flex items-start gap-3 border"
    style={{
      backgroundColor: "var(--color-error-bg)",
      borderColor: "var(--color-error-border)",
    }}
  >
    <AlertCircle
      className="w-5 h-5 flex-shrink-0 mt-0.5"
      style={{ color: "var(--color-error-icon)" }}
    />
    <p
      className="text-sm font-medium"
      style={{ color: "var(--color-error-text)" }}
    >
      {message}
    </p>
  </div>
);

export default ErrorAlert;

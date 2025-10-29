import { AlertCircle } from "lucide-react";
import { memo } from "react";

const FormField = memo(({ field, value, error, onChange }) => {
  const baseClasses = `w-full px-4 py-3 border-2 rounded-lg bg-surface border-border text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-ring ${
    error ? "border-red-500" : "focus:border-accent"
  }`;

  const renderInput = () => {
    switch (field.type) {
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseClasses}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows}
            className={baseClasses}
          />
        );

      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-fg">
        {field.label}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p
          className="text-sm mt-1 flex items-center gap-1"
          style={{ color: "var(--color-error-text)" }}
        >
          <AlertCircle
            className="w-4 h-4"
            style={{ color: "var(--color-error-icon)" }}
          />
          {error}
        </p>
      )}
    </div>
  );
});
export default FormField;

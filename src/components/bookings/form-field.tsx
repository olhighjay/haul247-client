interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  min?: number | string;
  max?: number;
  maxLength?: number;
  step?: string;
}

export const FormField = ({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  min,
  max,
  maxLength,
  step,
}: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        maxLength={maxLength}
        step={step}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-brand-500/20 ${
          error
            ? "border-red-300 focus:border-red-500"
            : "border-border focus:border-brand-500"
        }`}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  );
};

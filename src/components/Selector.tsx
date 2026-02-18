import React from "react";

export type Option = {
  id: string;
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type Props = {
  label?: string;
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
};

export default function Selector({ label, options, value, onChange, className = "" }: Props) {
  return (
    <div className={`scene-selector ${className}`}>
      {label && <div className="selector-label" style={{ marginBottom: 6 }}>{label}</div>}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.id}
              type="button"
              className="selector-button"
              data-selected={selected ? "true" : "false"}
              aria-pressed={selected}
              onClick={() => onChange(opt.value)}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                {opt.icon && <span aria-hidden>{opt.icon}</span>}
                <span className="option-text">{opt.label}</span>
              </div>
              <span className="check-wrapper" aria-hidden>
                {selected ? <span style={{ fontSize: 14 }}>✓</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
import React from "react";
import Select, {
  StylesConfig,
  Props as SelectProps,
  GroupBase,
} from "react-select";
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const getStyles = (
  align: "left" | "right" = "right"
): StylesConfig<SelectOption> => ({
  container: (base) => ({
    ...base,
    boxSizing: "border-box",
    width: "100%",
  }),
  control: (base) => ({
    ...base,
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "8px",
    fontWeight: "400",
    boxShadow: "none",
    fontFamily: "var(--font-inter)",
    fontSize: "14px",
    padding: "4px 8px 4px 8px",
    "&:hover": {
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.3)",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "16px",
    fontFamily: "var(--font-inter)",
    letterSpacing: "-0.23px",
    textAlign: align,
  }),
  singleValue: (base) => ({
    ...base,
    fontFamily: "var(--font-inter)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "16px",
    textAlign: align,
    color: "white",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.3)",
    padding: "4px",
    "&:hover": {
      color: "rgba(255, 255, 255, 0.5)",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "rgba(31, 41, 55, 0.95)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "rgba(59, 130, 246, 0.8)"
      : state.isFocused
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
    color: "white",
    textAlign: align,
    fontFamily: "var(--font-inter)",
    fontSize: "13px",
    "&:active": {
      backgroundColor: "rgba(59, 130, 246, 0.6)",
    },
  }),
});

interface SelectInputProps
  extends SelectProps<SelectOption, false, GroupBase<SelectOption>> {
  align?: "left" | "right";
}

function SelectInput({
  options,
  placeholder,
  align = "right",
  ...props
}: SelectInputProps) {
  return (
    <Select
      styles={getStyles(align)}
      options={options}
      placeholder={placeholder || "Select"}
      components={{
        IndicatorSeparator: null,
      }}
      {...props}
    />
  );
}

export default React.memo(SelectInput);

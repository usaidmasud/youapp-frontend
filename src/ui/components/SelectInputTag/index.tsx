import React, { KeyboardEventHandler } from "react";
import Select, { StylesConfig } from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputTagProps {
  options: SelectOption[];
  placeholder?: string;
  onChangeValue: (value: SelectOption[]) => void;
  values?: SelectOption[];
}

const styles: StylesConfig<SelectOption> = {
  container: (base) => ({
    ...base,
    boxSizing: "border-box",
    width: "100%",
  }),
  control: (base, state) => ({
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
    padding: "4px 8px",
    minHeight: "40px",
    color: "white",
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
  }),
  input: (base) => ({
    ...base,
    color: "white !important", // Force white text while typing
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
    fontFamily: "var(--font-inter)",
    fontSize: "14px",
    padding: "4px 8px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.6)",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "white",
    },
  }),
  singleValue: (base) => ({
    ...base,
    fontFamily: "var(--font-inter)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "16px",
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
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "rgba(59, 130, 246, 0.8)"
      : state.isFocused
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
    color: "white",
    fontFamily: "var(--font-inter)",
    fontSize: "13px",
    "&:active": {
      backgroundColor: "rgba(59, 130, 246, 0.6)",
    },
  }),
};

function SelectInputTag({
  options,
  placeholder,
  values,
  onChangeValue,
}: SelectInputTagProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState<SelectOption[]>([]);

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    if (event.key === "Enter" || event.key === "Tab") {
      const newOption = createOption(inputValue);

      const isAlreadyAdded = values?.some(
        (item) => item?.value === newOption.value
      );

      if (!isAlreadyAdded) {
        onChangeValue([...(values || []), newOption]);
      }

      setInputValue("");
      event.preventDefault();
    }
  };

  return (
    <Select
      styles={styles}
      options={options}
      placeholder={placeholder || "Select or type to add"}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator: null,
      }}
      isClearable
      isMulti
      // menuIsOpen={false}
      onChange={(selected) => {
        const selectedOptions = selected as SelectOption[];
        onChangeValue(selectedOptions);
      }}
      value={values}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      inputValue={inputValue}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}

export default React.memo(SelectInputTag);

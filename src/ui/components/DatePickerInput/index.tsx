import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
}
function DatePickerInput({ value, onChange }: DatePickerInputProps) {
  const [startDate, setStartDate] = useState<Date | null>(value || null);

  return (
    <DatePicker
      selected={startDate || null}
      onChange={(date) => {
        setStartDate(date);
        onChange?.(date);
      }}
      dateFormat="dd MM yyyy"
      placeholderText="DD MM YYYY"
      className="w-full rounded-lg border bg-[#D9D9D90F]  border-white/20 text-right placeholder:text-white/30 placeholder:font-medium placeholder:text-sm text-white text-sm font-medium leading-[100%] tracking-[0%] px-5 py-2.5"
    />
  );
}

export default React.memo(DatePickerInput);

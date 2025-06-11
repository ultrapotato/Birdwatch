// components/Calendar.tsx
"use client";

import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, TextFieldProps } from "@mui/material";

export function Calendar() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select a date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        {...(params:TextFieldProps) => <TextField {...params} fullWidth variant="outlined" />}

      />
    </LocalizationProvider>
  );
}

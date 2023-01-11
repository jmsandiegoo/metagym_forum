import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface TextInputComponent {
  name: string;
  label: string;
  TextFieldProps?: {};
}

const TextInput = ({ name, label, TextFieldProps }: TextInputComponent) => {
  const methods = useFormContext();
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <TextField
          label={label}
          {...field}
          {...(TextFieldProps && TextFieldProps)}
        />
      )}
    />
  );
};

export default TextInput;

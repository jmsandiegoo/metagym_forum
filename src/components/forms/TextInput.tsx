import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface TextInputComponent {
  name: string;
  label: string;
  validations?: {
    [key: string]: (value: any) => boolean | string;
  };
  TextFieldProps?: {};
}

const TextInput = ({
  name,
  label,
  validations,
  TextFieldProps,
}: TextInputComponent) => {
  const methods = useFormContext();
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...(validations &&
            validations.hasOwnProperty("required") && {
              InputLabelProps: { required: true },
            })}
          label={label}
          {...field}
          {...(TextFieldProps && TextFieldProps)}
          error={error ? true : false}
          helperText={error?.message}
        />
      )}
      // validation rules
      rules={{
        validate: {
          ...(validations ? validations : {}),
        },
      }}
    />
  );
};

export default TextInput;

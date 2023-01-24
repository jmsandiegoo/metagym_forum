import { Box, Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { OptionType } from "../../types";
import { countries } from "../../utilities/constants";
import { mapValueToOption } from "../../utilities/helper";

interface CountryInputProps {
  validations?: {
    [key: string]: (...args: any[]) => boolean | string;
  };
}

export default function CountrySelect({ validations }: CountryInputProps) {
  return (
    <Controller
      name="country"
      render={({ field: { ref, value, ...field }, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            id="country-select"
            options={countries}
            autoHighlight
            value={mapValueToOption(value, countries)}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.value}) +
                {countries.find((c) => c.value === option.value)?.phone}
              </Box>
            )}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                {...(validations &&
                  validations.hasOwnProperty("required") && {
                    InputLabelProps: { required: true },
                  })}
                label="Country"
                placeholder="Select your country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
            onChange={(_, data) => field.onChange(data?.value)}
          />
        );
      }}
      // validation rules
      rules={{
        validate: {
          ...(validations ? validations : {}),
        },
      }}
    />
  );
}

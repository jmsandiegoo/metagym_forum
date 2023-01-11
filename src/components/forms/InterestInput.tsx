import {
  Autocomplete,
  Chip,
  CircularProgress,
  FormControl,
  Popper,
  PopperProps,
  styled,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchInterests } from "../../store/interestThunk";
import { OptionType } from "../../types";
import { mapValuesToOptions } from "../../utilities/helper";
import InterestChip from "../InterestChip";

interface InterestInputProps {
  label: string;
}

const InterestDropdown = styled("ul")({
  display: "flex",
  flexWrap: "wrap",
});

const StyledOptionWrapper = styled("li")(({ theme }) => ({
  margin: "0.5rem !important",
  padding: "0 !important",
  "&:hover, &:active": {
    backgroundColor: "transparent !important",
  },
  "& .MuiChip-root:hover": {
    cursor: "pointer",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const InterestInput = ({ label }: InterestInputProps) => {
  const [interestOptions, setInterestOptions] = useState<OptionType[]>([]);
  const { loading: interestLoading, interests } = useAppSelector(
    (state) => state.interest
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInterests());
  }, []);

  useEffect(() => {
    if (interests.length !== 0) {
      setInterestOptions(
        interests.map((interest) => ({
          label: interest.name,
          value: interest.interestId,
        }))
      );
    }
  }, [interests]);

  return (
    <Controller
      name="interests"
      render={({ field: { ref, value, ...field } }) => (
        <FormControl fullWidth variant="standard">
          <Autocomplete
            {...field}
            openOnFocus
            clearOnBlur
            clearOnEscape
            multiple
            value={mapValuesToOptions(value, interestOptions)}
            ListboxComponent={InterestDropdown}
            options={interestOptions}
            getOptionLabel={(option: OptionType) => option.label}
            filterSelectedOptions
            loading={true}
            renderOption={(props, option, { selected }) => (
              <StyledOptionWrapper {...props}>
                <InterestChip label={option.label} {...props} />
              </StyledOptionWrapper>
            )}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderTags={(tagValue: OptionType[], getTagProps) =>
              tagValue.map((option: OptionType, index: number) => (
                <Chip
                  variant="outlined"
                  label={option.label}
                  color="primary"
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} inputRef={ref} label={label} />
            )}
            onChange={(_, data) => {
              console.log(data);
              return field.onChange(data.map((d) => d.value));
            }}
          ></Autocomplete>
        </FormControl>
      )}
    />
  );
};

export default InterestInput;

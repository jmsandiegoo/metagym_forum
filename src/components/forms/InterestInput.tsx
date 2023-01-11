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
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchInterests } from "../../store/interestThunk";
import InterestChip from "../InterestChip";

interface InterestInputProps {
  label: string;
}

interface OptionProps {
  label: string;
  value: string;
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
  const [interestOptions, setInterestOptions] = useState<OptionProps[]>([]);
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
    <FormControl fullWidth variant="standard">
      <Autocomplete
        openOnFocus
        clearOnBlur
        clearOnEscape
        multiple
        ListboxComponent={InterestDropdown}
        options={interestOptions}
        getOptionLabel={(option: OptionProps) => option.label}
        filterSelectedOptions
        loading={true}
        renderOption={(props, option, { selected }) => (
          <StyledOptionWrapper {...props}>
            <InterestChip label={option.label} {...props} />
          </StyledOptionWrapper>
        )}
        renderTags={(tagValue: OptionProps[], getTagProps) =>
          tagValue.map((option: OptionProps, index: number) => (
            <Chip
              variant="outlined"
              label={option.label}
              color="primary"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => <TextField {...params} label={label} />}
      ></Autocomplete>
    </FormControl>
  );
};

export default InterestInput;

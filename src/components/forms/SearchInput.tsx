import {
  Autocomplete,
  Chip,
  FormControl,
  styled,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setErrorFeedback } from "../../store/feedbackSlice";
import { fetchInterests } from "../../store/interestThunk";
import { searchThread } from "../../store/threadThunks";
import { OptionType } from "../../types";
import { mapValuesToOptions } from "../../utilities/helper";
import InterestChip from "../InterestChip";
import { SearchInputData } from "../navbar";

interface SearchInputProps {
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

const SearchInput = ({ label }: SearchInputProps) => {
  const [interestOptions, setInterestOptions] = useState<OptionType[]>([]);
  const { loading: interestLoading, interests } = useAppSelector(
    (state) => state.interest
  );
  const dispatch = useAppDispatch();

  const { handleSubmit } = useFormContext<SearchInputData>();

  useEffect(() => {
    dispatch(fetchInterests());
  }, []);

  const searchHandler: SubmitHandler<SearchInputData> = async (
    data: SearchInputData
  ) => {
    try {
      const _ = await dispatch(searchThread(data.search)).unwrap();
      // change url of home
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(setErrorFeedback(e.response?.data?.error || e.message));
      } else {
        dispatch(setErrorFeedback("An unexpected error occured"));
      }
    }
  };

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
      name="search"
      render={({ field: { ref, value, ...field } }) => (
        <FormControl fullWidth variant="standard">
          <Autocomplete
            {...field}
            freeSolo
            openOnFocus
            clearOnEscape
            multiple
            inputValue={value.title}
            value={mapValuesToOptions(value.interests, interestOptions)}
            ListboxComponent={InterestDropdown}
            options={interestOptions}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }

              return option.label;
            }}
            filterSelectedOptions
            loading={interestLoading}
            renderOption={(props, option, { selected }) => (
              <StyledOptionWrapper {...props}>
                <InterestChip label={option.label} {...props} />
              </StyledOptionWrapper>
            )}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            limitTags={2}
            renderTags={(tagValue: OptionType[], getTagProps) =>
              tagValue.map((option: OptionType, index: number) => (
                <Chip
                  // size="small"
                  variant="outlined"
                  label={option.label}
                  color="primary"
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                label={label}
                helperText="Press Enter ↵ "
                FormHelperTextProps={{ sx: { textAlign: "end" } }}
                placeholder="Enter the title to search"
              />
            )}
            onInputChange={(_, data) => {
              field.onChange({ interests: value.interests, title: data });
            }}
            onChange={(_, data) => {
              field.onChange({
                title: value.title,
                interests: data.map((d) => {
                  if (typeof d !== "string") {
                    return d.value;
                  }
                }),
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(searchHandler)();
              }
            }}
          ></Autocomplete>
        </FormControl>
      )}
    />
  );
};

export default SearchInput;

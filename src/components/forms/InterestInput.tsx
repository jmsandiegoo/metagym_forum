import {
  Autocomplete,
  Chip,
  FormControl,
  Popper,
  PopperProps,
  TextField,
} from "@mui/material";

interface InterestInputProps {
  label: string;
}

interface OptionProps {
  label: string;
  value: string;
}

// const InterestDropdown = (props)=>
//   <Popper {...props}>

//     <p>test</p>
//   </Popper>
// );

const InterestInput = ({ label }: InterestInputProps) => {
  //   const mapValue = (value) => {
  //     return value.map((v) => {
  //       return {
  //         label: v,
  //         value: v,
  //       };
  //     });
  //   };
  return (
    <FormControl fullWidth variant="standard">
      <Autocomplete
        openOnFocus
        clearOnBlur
        clearOnEscape
        multiple
        options={dummyInterestOptions}
        getOptionLabel={(option: OptionProps) => option.label}
        filterSelectedOptions
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
        //   isOptionEqualToValue={(option, value) =>
        //     option.label === value.label
        renderInput={(params) => <TextField {...params} label={label} />}
      ></Autocomplete>
    </FormControl>
  );
};

const dummyInterestOptions = [
  { label: "Gym", value: "1234-4567-890" },
  { label: "Calisthenics", value: "2234-4567-891" },
  { label: "Running", value: "3234-4567-892" },
  { label: "Bodybuilding", value: "4234-4567-893" },
];

export default InterestInput;

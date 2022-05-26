import { ReactNode, SyntheticEvent } from "react";
import { Autocomplete, AutocompleteRenderInputParams, createFilterOptions } from "@mui/material";

type TOptions = {
  inputValue?: string;
  label: string;
  value?: string;
};

type TProps = {
  clearOnBlur?: boolean;
  freeSolo?: boolean;
  handleHomeEndKeys?: boolean;
  onBlur: () => void;
  onChange: (e: SyntheticEvent, val: any) => void;
  options: TOptions[];
  renderInput: (params: AutocompleteRenderInputParams) => ReactNode;
  selectOnFocus?: boolean;
  size?: "small" | "medium";
  value: any;
};

const useAutoComplete = (props: TProps) => {
  const { clearOnBlur, freeSolo, handleHomeEndKeys, onBlur, onChange, options, renderInput, selectOnFocus, size, value } = props;

  const filter = createFilterOptions<TOptions>();

  const Component = (
    <Autocomplete
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      getOptionLabel={option => {
        if (typeof option === "string") {
          return option;
        }

        if (option.inputValue) {
          return option.inputValue;
        }

        return option.label;
      }}
      renderOption={(props, option) => <li {...props}>{option.label}</li>}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        let { inputValue } = params;
        inputValue = inputValue.trim();
        const isExisting = options.some(option => inputValue === option.label);

        if (inputValue !== "" && !isExisting) {
          filtered.push({ inputValue, label: `Add ${inputValue}` });
        }

        return filtered;
      }}
      renderInput={renderInput}
      options={options}
      size={size}
      selectOnFocus={selectOnFocus || !freeSolo}
      clearOnBlur={clearOnBlur || !freeSolo}
      handleHomeEndKeys={handleHomeEndKeys || !freeSolo}
      freeSolo={freeSolo || false}
    />
  );

  return Component;
};

export default useAutoComplete;

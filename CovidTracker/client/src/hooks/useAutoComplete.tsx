import { ReactNode, SyntheticEvent } from "react";
import { Autocomplete, AutocompleteRenderInputParams, FilterOptionsState } from "@mui/material";

type TProps = {
  clearOnBlur?: boolean;
  filterOptions?: (options: any[], state: FilterOptionsState<any>) => any[];
  freeSolo?: boolean;
  handleHomeEndKeys?: boolean;
  onBlur: () => void;
  onChange: (e: SyntheticEvent, val: any) => void;
  options: string[];
  renderInput: (params: AutocompleteRenderInputParams) => ReactNode;
  selectOnFocus?: boolean;
  size?: "small" | "medium";
  value: any;
};

const useAutoComplete = (props: TProps) => {
  const { clearOnBlur, filterOptions, freeSolo, handleHomeEndKeys, onBlur, onChange, options, renderInput, selectOnFocus, size, value } = props;
  const Component = (
    <Autocomplete
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      renderInput={renderInput}
      filterOptions={filterOptions}
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

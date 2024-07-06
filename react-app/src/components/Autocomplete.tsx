import React, { ChangeEvent, FocusEvent } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams, SuggestionSelectedEventData } from 'react-autosuggest';

interface AutocompleteProps<T> {
  description?: string;
  disabled?: boolean;
  filterOptions?: (options: T[], inputValue: string) => T[];
  label?: string;
  loading?: boolean;
  multiple?: boolean;
  onChange: (value: T | T[]) => void;
  onInputChange?: (event: ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => void;
  options: T[];
  placeholder?: string;
  renderOption?: (option: T) => React.ReactNode;
  value: T | T[];
}

// Define the interface for suggestion type (optional)
interface Suggestion<T> {
  id: string;
  value: T;
}

// Autocomplete component
function Autocomplete<T>({
  description,
  disabled = false,
  filterOptions,
  label,
  loading = false,
  multiple = false,
  onChange,
  onInputChange,
  options,
  placeholder,
  renderOption,
  value,
}: AutocompleteProps<T>) {
  // Function to fetch suggestions
  const fetchSuggestions = ({ value }: SuggestionsFetchRequestedParams) => {
    if (!filterOptions) {
      // Default filtering: simple string equality comparison
      return options.filter(option =>
        typeof option === 'string'
          ? option.toLowerCase().includes(value.trim().toLowerCase())
          : false // Handle object type options filtering as needed
      );
    }
    return filterOptions(options, value);
  };

  // Callback when suggestion is selected
  const onSuggestionSelected = (
    event: React.FormEvent,
    { suggestion }: SuggestionSelectedEventData<T>
  ) => {
    onChange(multiple ? [...(value as T[]), suggestion.value] : suggestion.value);
  };

  // Input change handler
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    if (onInputChange) {
      onInputChange(event, { newValue });
    }
  };

  // Render suggestion
  const renderSuggestion = (suggestion: T) => (
    <div>
      {renderOption ? renderOption(suggestion) : suggestion}
    </div>
  );

  // Autosuggest component props
  const inputProps = {
    placeholder: placeholder || '',
    value: value as any, // TypeScript workaround for handling value as any
    onChange: handleInputChange,
    disabled: loading || disabled,
  };

  return (
    <div>
      {label && <label>{label}</label>}
      {/* <Autosuggest
        suggestions={fetchSuggestions}
        onSuggestionsFetchRequested={fetchSuggestions}
        getSuggestionValue={(suggestion: T) =>
          typeof suggestion === 'string' ? suggestion : '' // Adjust as per your suggestion type
        }
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      /> */}
      {description && <p>{description}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Autocomplete;

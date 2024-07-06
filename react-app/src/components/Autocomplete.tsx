import React, { ChangeEvent, useRef, useState } from "react";

type Option = string;

type AutocompleteProps = {
    label: string;
    options: Option[];
    onChange: (value: Option | null) => void; 
    onInputChange?: (inputValue: string) => void; 
    disabled?: boolean;
}


function Autocomplete({label, options, onChange, onInputChange, disabled}: AutocompleteProps) {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    //show options upon clicking on input
    function handleInputClick() {
        setShowOptions(true);
    };

    //for mouse event ie clicking outside
    const inputRef = useRef<HTMLInputElement>(null);
    function handleOutsideClick(event: MouseEvent) {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setShowOptions(false);
          }
    };
    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => { document.removeEventListener('mousedown', handleOutsideClick);}
    }, []);

    //show only filtered options upon input change
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (disabled) { return;}
        setSelectedOption(null); //reset selected option right when input changes

        const value = event.target.value;
        setInputValue(value);
        if (onInputChange) {
            onInputChange(value);
        }
        const filteredList = options.filter(option => 
            option.toLowerCase().includes(value.toLowerCase()));
        setFilteredOptions(filteredList);
    };

    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    function handleOptionClick(option: Option) {
        if (disabled) { return;}
        setSelectedOption(option); //keeps track of current option being chosen
        onChange(option);
        setInputValue(option);
        setShowOptions(false);
    };
    //when option is clicked, input value will be updated to it

    //function to clear the input if nothing is selected
    function clear() {
        if (disabled) { return;}
        setSelectedOption(null);
        setInputValue('');
        onChange(null);
        setShowOptions(false); 
    };
    
    return (
        <div>           
            <label>{label}</label>
            <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search"
            disabled={disabled}
            onClick={handleInputClick}
            ref={inputRef}
            />
            <button onClick={clear}> X </button>
            {showOptions && 
                <ul>
                    {filteredOptions.map(option => (
                        <li key={option} onClick={()=> handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Autocomplete;
import { ChangeEvent, useState } from "react";

type Option = string;

type AutocompleteProps = {
    label: string;
    options: Option[];
    onChange: (value: Option | null) => void; 
    onInputChange?: (inputValue: string) => void; 
}


function Autocomplete({label, options, onChange, onInputChange}: AutocompleteProps) {
    const [inputValue, setInputValue] = useState<string>('');
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSelectedOption(null); //reset selected option right when input changes

        const value = event.target.value;
        setInputValue(value);
        if (onInputChange) {
            onInputChange(value); //update the input
        }
        const filteredOptions = options.filter(option => 
            option.toLowerCase().includes(value.toLowerCase()));
        
    };

    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    function handleOptionClick(option: Option) {
        setSelectedOption(option); //keeps track of current option being chosen
        onChange(option);
        setInputValue(option);
    };
    //when option is clicked, input value will be updated to it

    
    return (
        <div>
            <label>{label}</label>
            <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search"
            />
            <ul>
                {options.map(option => (
                    <li key={option} onClick={()=> handleOptionClick(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Autocomplete;
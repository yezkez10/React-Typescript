import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import './Autocomplete.css';

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

    const [highlightedID, setHighlightedID] = useState<number>(-1);
    function resetID() {
        setHighlightedID(-1);
    }
    //allowing keyboard controls
    function handleKeys(event: KeyboardEvent<HTMLInputElement>) {
        if (!showOptions || filteredOptions.length === 0) return;
        switch (event.key) {
            case 'ArrowDown':
                setHighlightedID(prev => prev < filteredOptions.length - 1 ? prev + 1 : 0);
                //if not yet reached end of list, keep going down. else restart at index 0
                break;
            case 'ArrowUp':
                setHighlightedID(prev => prev > 0 ? prev - 1 : filteredOptions.length - 1)
                break;
            case 'Enter':
                if (highlightedID >= 0) {
                    const chosenOption = filteredOptions[highlightedID];
                    handleOptionClick(chosenOption);
                    resetID();
                }
                break;
            default:
                break;
        }
    };

    //for mouse event ie clicking outside
    const inputRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);
    function handleOutsideClick(event: MouseEvent) {
        if (inputRef.current && inputRef.current.contains(event.target as Node)) {
            //keep options open when click on input
            setShowOptions(true);
          } else if (optionsRef.current && optionsRef.current.contains(event.target as Node)) {
            //keep options open when click on option
            setShowOptions(true);
          } else {
            //close options when click anywhere else
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
        resetID();
    };

    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    function handleOptionClick(option: Option) {
        if (disabled) { return;}
        setSelectedOption(option);
        onChange(option);
        setInputValue(option);
        setShowOptions(true);
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
        <div className="autocomplete">           
            <label className="autocomplete-label">{label}</label>
            <div className="autocomplete-container">
                <input
                    className="autocomplete-input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Search"
                    disabled={disabled}
                    onClick={handleInputClick}
                    ref={inputRef}
                    onKeyDown={handleKeys}
                    />
                <button onClick={clear}> X </button>
            </div>
            {showOptions && 
                <ul ref={optionsRef} 
                    className="autocomplete-options">
                    {filteredOptions.map((option, index) => (
                        <li 
                            key={option} 
                            onClick={()=> handleOptionClick(option)}
                            className={`autocomplete-option ${highlightedID === index ? 'highlighted' : ''}`}>
                            {option}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Autocomplete;
import './App.css';
import Autocomplete from './components/Autocomplete';
import { useState } from 'react';

type Option = string;
const options: Option[] = [
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "North America",
  "Australia",
  "South America"
];

function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isDisabled, setDisable] = useState<boolean>(false);

  function handleChange(option: Option | null) {
    setSelectedOption(option);
  };

  return (
    <div className="App">
      <Autocomplete
        label='Search for continents: '
        options={options}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <div>
      </div>
    </div>
  );
}

export default App;
import './App.css';
import Autocomplete from './components/Autocomplete';
import { useState } from 'react';

type Option = string;
const options: Option[] = [
  'Apple', 'Banana', 'Grape', 'Strawberry'
]

function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isDisabled, setDisable] = useState<boolean>(false);

  function handleChange(option: Option | null) {
    setSelectedOption(option);
  };

  return (
    <div className="App">
      <Autocomplete
        label='Search: '
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

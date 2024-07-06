import './App.css';
import Autocomplete from './components/Autocomplete';
import { useState } from 'react';

type Option = string;
const options: Option[] = [
  'Apple', 'Banana', 'Grape', 'Strawberry'
]

function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  function handleChange(option: Option | null) {
    setSelectedOption(option);
  };

  return (
    <div className="App">
      <Autocomplete
        label='Fruits'
        options={options}
        onChange={handleChange}/>
        
    </div>
  );
}

export default App;

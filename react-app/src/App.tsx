import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from './components/Autocomplete';

function App() {
  const MyComponent: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string | string[]>([]);
    
    const handleChange = (value: string | string[]) => {
      setSelectedValue(value);
      // Perform any additional logic based on selected value
    };
    
    return (
    <div className="App">
      <header className="App-header">
        
        <Autocomplete
        description="Start typing to search options."
        label="Search Options"
        loading={false}
        onChange={handleChange}
        options={['Apple', 'Banana', 'Orange', 'Mango']}
        placeholder="Type to search..."
        value={selectedValue}
        />
        
      </header>
    </div>
  );
}
}

export default App;

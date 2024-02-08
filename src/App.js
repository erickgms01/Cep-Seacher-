import {useState} from 'react';
import {FiSearch} from 'react-icons/fi'
import './styles/style.css'
import apiCep from './services/api';


function App() {
  const [input, setInput] = useState('');
  
  const [cep, setCep] = useState({});
  async function clickButton() {
    if  (input === '') {
      alert('fill in the field!!')
      return;
    }

    try{
      const response = await apiCep.get(`${input}/json`);
      setCep(response.data)
      setInput('') 
    }catch{
      alert("Postal Code not found!")
      setInput('')
    }
  }
  return (

    <div className="container">
      <div className="title">Searcher  Postal Code</div>

      <div className="container-input">
        <input
        type="text"
        placeholder="Enter your postal code..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className='buttonSearch' onClick={clickButton}>
          <FiSearch size={25} color="#fffff"/>
        </button>
      </div>
      
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>Postal Code: {cep.cep}</h2>
          <span> {cep.logradouro}</span>  
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf} </span>
        </main>
      )}

    </div>
  );
}



export default App;

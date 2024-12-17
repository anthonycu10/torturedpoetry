// import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  const sampleData = [
    'Apple',
    'Banana',
    'Orange',
    'Grapes',
    'Blueberry',
    'Strawberry',
    'Pineapple',
    'Mango',
  ];

  return (
    <div className="App">
      <h1>Fruit Search</h1>
      <SearchBar data={sampleData} />
    </div>
  );
  
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

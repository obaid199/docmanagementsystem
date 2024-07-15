import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import FileReaderComponent from './components/FileReaderComponent';
import DocViewerWithInput from './components/DocViewerWithInput';


function App() {
  return (
    <div className="App">
      <Home/>
      {/* <FileReaderComponent/> */}
      <DocViewerWithInput/>
      
    </div>
  );
}

export default App;

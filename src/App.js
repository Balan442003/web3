import './App.css';
import MetaMaskLogin from './Components/Meta';
import Readmethod from './Components/Readmethod';
import { Routes, Route } from 'react-router-dom';
import Writecontract from './Components/Writecontract'
import Maintask from './Components/Maintask'
import Approve from './Components/Approve'

function App() {
  return (
    <div >
      <Routes>
        <Route path='/Metamask' element={<MetaMaskLogin />}/>
        <Route path='/Contract' element={<Readmethod />}/>
        <Route path='/Writecontract' element={<Writecontract />}/>
        <Route path='/Maintask' element={<Maintask />}/>
        <Route path='/Approve' element={<Approve />}/>

      </Routes>
    </div>
  );
}

export default App;

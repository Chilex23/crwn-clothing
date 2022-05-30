import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
)

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/shop/hats' element={HatsPage()} />
      </Routes>
      {/* <HomePage /> */}
    </div>
  );
}

export default App;

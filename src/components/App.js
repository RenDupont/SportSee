import Dashboard from './Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/user/:id' element={<Dashboard />} />
    </Routes>
  );
}

export default App;

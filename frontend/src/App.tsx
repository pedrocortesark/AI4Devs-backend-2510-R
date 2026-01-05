import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecruiterDashboard from './components/RecruiterDashboard';
import AddCandidateForm from './components/AddCandidateForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/**
 * Componente raíz de la aplicación
 * Configura el routing entre Dashboard y formulario de candidatos
 */
function App()
{
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecruiterDashboard />} />
          <Route path="/add-candidate" element={<AddCandidateForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react'
import './App.css';
import Dashboard from './pages/admin/dashboard/dashboard';
import Login from './pages/Login';
import dashboard from './pages/admin/dashboard/dashboard'
import Routes from './routes';

function App() {
  return (
    <div className="App">
      {/* <Dashboard /> */}
      <Routes />
    </div>
  );
}

export default App;

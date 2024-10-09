
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import WeatherBoard from './pages/WeatherBoard';
import Navbar from './pages/NavBar'; // Import the Navbar component
import Signup from './pages/Signup';
import ForecastDay from './pages/ForecastDay';
import SearchHistory from './pages/SearchHistory';
import Footer from './pages/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer);

  return (
    <div className="App">
     {authSelector?.access_token && <Navbar /> }
      <Routes>
        {
        
          authSelector?.access_token ? (
            <>
           
              <Route path="/" element={<WeatherBoard />} />
              <Route path="/forecast" element={<ForecastDay />} />
              <Route path="/recent/:city" element={<SearchHistory />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )
        }
      </Routes>
      {authSelector?.access_token && <Footer /> }
    </div>
  );
}

export default App;

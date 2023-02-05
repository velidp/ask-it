import './App.css';
import { useState } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Auth from './components/Auth/Auth';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import MyQuestions from './components/Profile/myQuestions/myQuestions';
import Questions from './components/Question/Question';

function App() {

  const [userUpdate, setUserUpdate] = useState(false);


  return (
    <Router basename='/'>
      <Header userUpdate={userUpdate}></Header>
      
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/auth' element={<Auth />} />
          <Route exact path='/profile' element={<Profile userUpdate={userUpdate} setUserUpdate={setUserUpdate}/>} />
          <Route exact path='/my-questions' element={<MyQuestions/>} />
          <Route exact path='/questions' element={<Questions/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;

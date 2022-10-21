import './App.css';
import { useState } from 'react';
import Header from './components/header/header';
import Home from './components/home/home';
import Profile from './components/profile/profile';
import Auth from './components/auth/auth';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import MyQuestions from './components/profile/myQuestions/myQuestions';
import Questions from './components/questions/questions';

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

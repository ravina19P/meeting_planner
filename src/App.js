import './App.css';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Package from './Components/Packages/Package';
import User from './Components/User/User'
import Rooms from './Components/Rooms/Rooms'
import BookRoom from './Components/BookRoom/BookRoom'
import Clients from './Components/Clients/Clients'
import Activations from './Components/Activations/Activations';
import BookingCalander from './Components/BookingCalander/BookingCalander'
import Logo from './Components/Other/Logo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path='/' element={<Logo></Logo>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/packages' element={<Package></Package>}></Route>
        <Route path='/activations' element={<Activations></Activations>}></Route>
        <Route path='/user' element={<User></User>}></Route>
        <Route path='/rooms' element={<Rooms></Rooms>}></Route>
        <Route path='/bookRoom' element={<BookRoom></BookRoom>}></Route>
        <Route path='/clients' element={<Clients></Clients>}></Route>
        <Route path='/bookingCalander' element={<BookingCalander></BookingCalander>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import ListingPage from './pages/ListingPage';
import Search from './pages/Search';

const App = () => {
  return <BrowserRouter>
  <Header />
  <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/sign-in' element={<Signin />} />
  <Route path='/sign-up' element={<SignUp />} />
  <Route path='/listing/:id' element={<ListingPage />} />
  <Route path='/search' element={<Search />} />
  <Route element={<PrivateRoute />}>
  <Route path='/profile' element={<Profile />} />
  </Route>
  <Route element={<PrivateRoute />}>
  <Route path='/create-listing' element={<CreateListing />} />
  <Route path='/update-listing/:listingId' element={<UpdateListing />} />
  </Route>
  <Route path='/About' element={<About />} />
  </Routes>
  </BrowserRouter>;
}

export default App
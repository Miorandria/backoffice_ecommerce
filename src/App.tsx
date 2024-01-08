import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import Tables from './pages/Tables';
import AddUser from './pages/AddUser';
import NotFound from './pages/Notfound';
import Homepage from './pages/Homepage';
import Produit from './pages/Produit';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading)
    return <p className=" text-center text-danger">Failed to lead app</p>;

  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* <Route path="/" element={<Chart />} /> */}
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/produit/:id" element={<Produit />} />
          {/* <Route path="/forms/form-elements" element={<FormElements />} /> */}
          {/* <Route path="/forms/form-layout" element={<FormLayout />} /> */}
          <Route path="/tables" element={<Tables />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chart" element={<Chart />} />
          {/* <Route path="/ui/alerts" element={<Alerts />} /> */}
          {/* <Route path="/ui/buttons" element={<Buttons />} /> */}
        </Route>
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/auth/signup" element={<SignUp />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

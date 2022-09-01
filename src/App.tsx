// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.less';
import Home from './pages/Home';
import Result from './pages/Result';

function App() {
  return (
    <div className="layout_view">
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/result" element={<Result />}></Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
  // useRoutes(layoutRouteList);
}

export default App;

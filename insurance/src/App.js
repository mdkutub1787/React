import React from 'react';
import Header from './pages/navbar/Header';  // Correct import
import { Routes, Route } from 'react-router-dom';  // Add Route to the import
import NotFound from './pages/notFound';
import FirePolicyComponent from './pages/view_policy/View_Policy';
import FirePolicyCreate from './pages/create_policy/Create_Policy';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/viewpolicy" element={<FirePolicyComponent />} />
        <Route path="/createpolicy" element={<FirePolicyCreate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

import React, { useState } from 'react'; // Make sure to import useState
import Header from './pages/navbar/Header';  // Correct import for the navbar
import { Routes, Route } from 'react-router-dom';  // Add Route to the import
import NotFound from './pages/notFound';  // 404 page when the route doesn't match
import FirePolicyComponent from './pages/view_policy/View_Policy';  // Page to view policies
import FirePolicyCreate from './pages/create_policy/Create_Policy';  // Page to create policies
import CreateFire from './pages/component/Create_Fire';  // Page to create fire-related data
import ViewFire from './pages/component/View_Fire';  // Page to view fire-related data

function App() {
  // State to store fire items
  const [items, setItems] = useState([]);
  
  // State for editing an item
  const [currentItem, setCurrentItem] = useState(null);

  // Define the onSave function to save the form data
  const handleSave = (formData) => {
    if (currentItem) {
      // If there's a current item, we update it
      setItems(items.map(item => item.id === currentItem.id ? formData : item));
    } else {
      // Otherwise, add a new item to the list
      setItems([...items, formData]);
    }
    setCurrentItem(null); // Reset current item after saving
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/viewpolicy" element={<FirePolicyComponent />} />
        <Route path="/createpolicy" element={<FirePolicyCreate />} />
        <Route path="/viewfire" element={<ViewFire />} />
        <Route path="/createfire" element={<CreateFire onSave={handleSave} currentItem={currentItem} />} />
        <Route path="*" element={<NotFound />} />  {/* Default route for unknown paths */}
      </Routes>
      
      <div>
        <h1>Fire Items</h1>
        <h2>Item List</h2>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} - {item.price}
              <button onClick={() => setCurrentItem(item)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

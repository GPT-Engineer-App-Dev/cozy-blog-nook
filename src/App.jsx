import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import AddPost from "./pages/AddPost.jsx"; // Import the new AddPost component
import { ColorModeScript } from "@chakra-ui/react"; // Import ColorModeScript

function App() {
  return (
    <>
      <ColorModeScript />
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/add-post" element={<AddPost />} /> {/* Add route for AddPost */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

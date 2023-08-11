import LoginPage from "./Components/LoginPage";
import MessageForm from "./Components/MessageForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/message" element={<MessageForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

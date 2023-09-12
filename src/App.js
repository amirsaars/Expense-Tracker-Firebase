import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { ExpenseTracker } from "./pages/expense-tracker";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
      </Routes>
    </div>
  );
}

export default App;

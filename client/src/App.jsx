import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Update from "./pages/Update";
import Record from "./pages/table";
import Inventry from "./pages/inventry";
import Userview from "./pages/userview";






export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/manage/:idd" element={<Update />} />
        <Route path="/" element={<Record />} />
        <Route path="/addinvetry" element={<Inventry/>} />
        <Route path="/user" element={<Userview/>} />
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

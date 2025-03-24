import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Update from "./pages/Update";
import Record from "./pages/table";
import Inventry from "./pages/inventry";
import Userview from "./pages/userview";
import Supply from "./pages/supply";






export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/manage/:idd" element={<Update />} />
        <Route path="/" element={<Record />} />
        <Route path="/addinvetry" element={<Inventry/>} />
        <Route path="/dash" element={<Userview/>} />

        <Route path="/supply" element={<Supply/>} />
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

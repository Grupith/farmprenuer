import { BrowserRouter, Routes, Route } from "react-router-dom"
import Game from "./components/Game"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

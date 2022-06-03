import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./footer";
import Header from "./header";
import routes from "./router";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="pb-16 md:pb-0 min-h-screen">
        <Routes>
          {routes.map((element) => (
            <Route
              key={element.path}
              element={<element.component />}
              path={element.path}
            />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

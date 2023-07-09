import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <HashRouter basename="/">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;

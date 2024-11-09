import "./App.css";
import {
  SignedIn,
  SignedOut
} from "@clerk/clerk-react";
import Home from "./pages/Home";
import Main from "./pages/Main";

function App() {
  return (
    <>
      <SignedOut>
        <Home />
      </SignedOut>
      <SignedIn>
        <Main />
      </SignedIn>
    </>
  );
}

export default App;

import "./App.css";
import {
  SignedIn,
  SignedOut
} from "@clerk/clerk-react";
import Home from "./pages/Home";
import Sign from "./pages/Main";

function App() {
  return (
    <>
      <SignedOut>
        <Home />
      </SignedOut>
      <SignedIn>
        <Sign />
      </SignedIn>
    </>
  );
}

export default App;

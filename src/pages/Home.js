import { SignInButton, SignUpButton } from "@clerk/clerk-react";

import Logo from "../assets/favicon.png";

function Home() {
  return (
    <div className="home">
      <div className="navbar signbar">
        <div className="logo">NoteTaker</div>
        <div className="sign-buttons">
          <SignInButton>
            <button className="buttons sign">Sign In</button>
          </SignInButton>
          <SignUpButton>
            <button className="buttons sign">Sign Up</button>
          </SignUpButton>
        </div>
      </div>
      <div className="main-container">
        <div className="text-container">
          <h1>Welcome to NoteTaker</h1>
          <p>A simple and minimalistic note talking application.</p>
          <p>Access your thoughts, anytime, anywhere, on any Device.</p>
          <p>No folders, no clutter. Just your ideas and thoughts.</p>
          <p>Sign Up to create a new account.</p>
          <p>Sign In to access your notes.</p>
          <div className="trynow">
            <SignUpButton>
              <button className="buttons ">Try Now</button>
            </SignUpButton>
          </div>
        </div>
        <div className="img-container">
          <img src={Logo} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;

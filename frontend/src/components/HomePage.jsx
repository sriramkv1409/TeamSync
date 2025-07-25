import React from 'react';
// import { Link } from "react-router-dom"; // Removed to fix the error

// --- NOTE FOR SETUP ---
// Make sure you have imported the Bootstrap CSS file in your project's entry point.
// Also, ensure Bootstrap's JavaScript is available for the responsive navbar to work.

// --- Sub-Components for the Homepage (Bootstrap Version) ---

// Navbar Component (Bootstrap)
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">TeamSync</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="btn btn-primary me-2 mb-2 mb-lg-0" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="btn btn-outline-light" href="/register">Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Header Component (Bootstrap)
const Header = () => (
  <header className="bg-dark text-light text-center py-5">
    <div className="container">
      <h1 className="display-4 fw-bold">TeamSync</h1>
      <p className="lead text-white-50">Manage Employees with their Attendance and Streamline your Tasks</p>
    </div>
  </header>
);

// Quote Data
const quotes = [
  {
    text: "The strength of the team is each individual member. The strength of each member is the team.",
    author: "Phil Jackson"
  },
  {
    text: "Great things in business are never done by one person. They're done by a team of people.",
    author: "Steve Jobs"
  },
  {
    text: "To handle yourself, use your head; to handle others, use your heart.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  }
];

// Main Content Component (Bootstrap)
const MainContent = () => (
  <main className="py-5 bg-dark">
    <div className="container">
      <h2 className="text-center text-light mb-5 fw-bold">Words to Work By</h2>
      <div className="row">
        {quotes.map((quote, index) => (
          <div key={index} className="col-lg-6 mb-4">
            <div className="card text-white bg-secondary h-100 shadow">
              <div className="card-body d-flex flex-column">
                <blockquote className="blockquote mb-0 flex-grow-1">
                  <p>"{quote.text}"</p>
                  <footer className="blockquote-footer text-white-50 mt-3">{quote.author}</footer>
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

// Footer Component (Bootstrap)
const Footer = () => (
  <footer className="py-4 bg-dark text-center border-top border-secondary">
    <div className="container">
      <p className="m-0 text-white-50">© 2025 TeamSync™. All Rights Reserved.</p>
    </div>
  </footer>
);

// --- Main Homepage Component ---
const HomePage = () => (
  <div className="bg-dark" style={{ paddingTop: '56px' }}> {/* Add padding to offset fixed navbar */}
    <Navbar />
    <Header />
    <MainContent />
    <Footer />
  </div>
);

export default HomePage;
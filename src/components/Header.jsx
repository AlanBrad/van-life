import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to='/'>#VANLIFE</Link>
      <nav>
        <Link to='/about'>About</Link>
        <Link to='/vans'>Vans</Link>
      </nav>
    </header>
  );
}

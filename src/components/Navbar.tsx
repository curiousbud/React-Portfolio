// import React from 'react'
import areebLogo from '../assets/areeb.svg'

import '../assets/css/index.css'
import { useHideOnScrollNavbar } from '../hooks/useHideOnScrollNavbar';
import Sidebar from './Sidebar';
import { useState } from 'react';


function Navbar() {
    const visible = useHideOnScrollNavbar();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <header>
                <nav className={`navbar flex justify-between items-center p-2 h-18 w-100% fixed top-0 left-0 right-0 bg-black navbar-hide-on-scroll${visible ? '' : ' navbar-hidden'}`}>
                <div className="nav-animated">
                    <a
                        href="/"
                        className="flex flex-col items-center justify-center group relative h-10 w-10"
                    >
                        <img
                            src={areebLogo}
                            className="logo h-8 w-8 transition-all duration-500 z-2 opacity-100 scale-100 group-hover:scale-110"
                            alt="Areeb logo"
                        />
                        <span
                            className="absolute left-1/2 top-1/2 font-sans text-sm text-(--icon-color) opacity-0 transition-all duration-500 scale-0 translate-y-full -translate-x-1/2 z-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
                        >
                            Areeb Khan
                        </span>
                    </a>
                </div>
                {/* Hamburger menu */}
                <button
                  className="flex flex-col justify-center items-center w-10 h-10 ml-4 focus:outline-none"
                  onClick={() => setSidebarOpen((open) => !open)}
                  aria-label="Toggle sidebar"
                >
                  <span className="block w-7 h-1 bg-(--icon-color) mb-1 rounded transition-all"></span>
                  <span className="block w-7 h-1 bg-(--icon-color) mb-1 rounded transition-all"></span>
                  <span className="block w-7 h-1 bg-(--icon-color) rounded transition-all"></span>
                </button>
                {/* Sidebar slides in from right */}
                <div className={`fixed top-16 right-4 z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} `} style={{maxWidth: '260px'}}>
                  <Sidebar />
                </div>
            </nav>
            </header>
        </>
    )
}

export default Navbar
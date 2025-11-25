// import React from 'react'
import areebLogo from '../assets/areeb.svg'
import '../assets/css/index.css'
import { useHideOnScrollNavbar } from '../hooks/useHideOnScrollNavbar';

function Navbar() {
    const visible = useHideOnScrollNavbar();
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
                <div>
                    <ul className="nav-animated flex space-x-1 text-sm p-2">
                            <li>
                                <a href="#home" className='p-1 flex flex-col items-center'>
                                    <i className="fa-solid fa-house nav-icon m-1"></i>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="#about" className='p-1 flex flex-col items-center'>
                                    <i className="fa-solid fa-user nav-icon m-1"></i>
                                    <span>About</span>
                                </a>
                            </li>
                            <li>
                                <a href="#skills" className='p-1 flex flex-col items-center'>
                                    <i className="fa-solid fa-magnifying-glass nav-icon m-1"></i>
                                    <span>Skills</span>
                                </a>
                            </li>
                            <li>
                                <a href="#projects" className='p-1 flex flex-col text-center items-center'>
                                    <i className="fa-solid fa-github nav-icon m-1"></i>
                                    <span>GitHub</span>
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className='p-1 flex flex-col items-center'>
                                    <i className="fa-solid fa-phone nav-icon m-1"></i>
                                    <span>Contact</span>
                                </a>
                            </li>
                    </ul>
                </div>
            </nav>
            </header>
        </>
    )
}

export default Navbar
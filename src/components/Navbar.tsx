// import React from 'react'
import areebLogo from '../assets/areeb.svg'
import '../assets/css/index.css'

function Navbar() {
  return (
    <>
        <header>
            <nav className="navbar flex justify-between items-center p-2">
                <div className="nav-animated">
                    <a
                        href="/"
                        className="flex flex-col items-center justify-center group relative w-32 h-32"
                    >
                        <img
                            src={areebLogo}
                            className="logo h-16 w-16 transition-all duration-500 z-2 opacity-100 scale-100 group-hover:scale-120"
                            alt="Areeb logo"
                        />
                        <span
                            className="absolute left-1/2 top-1/2 font-sans text-xl text-(--icon-color) opacity-0 transition-all duration-500 scale-0 translate-y-full -translate-x-1/2 z-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
                        >
                            Areeb Khan
                        </span>
                    </a>
                </div>
                <div>
                    <ul className="nav-animated flex space-x-0.5 text-lg p-2">
                            <li>
                                <a href="#" className='p-1 flex flex-col items-center'>
                                    <i className="fa-solid fa-house text-(--icon-color) m-1 text-lg sm:text-xl"></i>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className='p-1 flex flex-col items-center'>
                                    <i className="fa-solid fa-user text-(--icon-color) m-1 text-lg sm:text-xl"></i>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className='p-1 flex flex-col items-center'>
                                    <i className="fa-solid fa-phone text-(--icon-color) m-1 text-lg sm:text-xl"></i>
                                    <span>Contact</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className='p-1 flex flex-col items-center'>
                                    <i className="fa-solid fa-file text-(--icon-color) m-1 text-lg sm:text-xl"></i>
                                    <span>Projects</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className='p-1 flex flex-col items-center'>
                                    <i className="fa-solid fa-magnifying-glass text-(--icon-color) m-1 text-lg sm:text-xl"></i>
                                    <span>Search</span>
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
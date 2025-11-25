import React from 'react';
import '../assets/css/index.css';

const navButtons = [
	{ href: '', icon: 'fa-house', label: 'Home' },
	{ href: '#about', icon: 'fa-user', label: 'About' },
	{ href: '#skills', icon: 'fa-magnifying-glass', label: 'Skills' },
	{ href: '#projects', icon: 'fa-github', label: 'Projects' },
	{ href: '#experience', icon: 'fa-briefcase', label: 'Experience' },
	{ href: '#certifications', icon: 'fa-certificate', label: 'Certs' },
	{ href: '#education', icon: 'fa-graduation-cap', label: 'Education' },
	{ href: '#publications', icon: 'fa-book', label: 'Publications' },
	{ href: '#contact', icon: 'fa-phone', label: 'Contact' },
];

const Sidebar: React.FC = () => {
	return (
		<aside className="flex flex-col items-end justify-center h-full">
			<div className="grid grid-cols-3 gap-x-6 gap-y-4 p-2 bg-black bg-opacity-80 rounded-lg shadow-lg">
				{navButtons.map((btn) => (
					<a
						key={btn.href}
						href={btn.href}
						className="nav-animated flex flex-col items-center justify-center text-sm p-2 transition-all duration-500 z-2 opacity-100 scale-100 hover:scale-110 group relative"
						style={{ minWidth: 60 }}
					>
						<i className={`fa-solid ${btn.icon} nav-icon m-1`}></i>
						<span className="absolute left-1/2 top-full font-sans text-xs text-(--icon-color) opacity-0 transition-all duration-500 scale-0 translate-y-2 -translate-x-1/2 z-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0">
							{btn.label}
						</span>
					</a>
				))}
			</div>
		</aside>
	);
};

export default Sidebar;

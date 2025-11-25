
# Areeb Khan – React Portfolio

This is a personal portfolio website built with React, TypeScript, and Vite. It showcases my skills, projects, and contact information in a modern, responsive design.

## Features

- **About Me**: Introduction and background.
- **Skills**: Animated marquee of technical skills and tools.
- **Projects**: Dynamic project showcase (GitHub integration).
- **Contact**: Easy way to reach out via email.
- **Responsive Design**: Looks great on all devices.

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
```bash
git clone https://github.com/curiousbud/React-Portfolio.git
cd React-Portfolio
npm install
# or
yarn install
```

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) to view the site.

### Building for Production
```bash
npm run build
# or
yarn build
```


## How to Change Portfolio Data

All your portfolio content is managed from a single file: `gitprofile.config.ts` in the project root. You do **not** need to edit any React components to update your data.

### Steps to Update Your Data

1. **Open `gitprofile.config.ts`**
	 - This file contains all your personal, professional, and project information in a structured format.

2. **Edit the relevant section:**
	 - **Home/About Me:**
		 ```ts
		 home: {
			 firstName: 'Areeb',
			 lastName: 'Khan',
			 headline: 'Frontend Developer',
			 description: 'Short intro about yourself.',
			 profileImage: '/assets/profile.png',
			 email: 'your@email.com',
		 },
		 aboutMe: {
			 header: 'About Me',
			 description: 'A longer description for the About Me section.'
		 },
		 ```
	 - **Skills:**
		 ```ts
		 skills: [
			 { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
			 { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
			 // ...add more skills
		 ],
		 ```
	 - **Projects:**
		 - GitHub projects are fetched automatically if you set your GitHub username.
		 - For manual/external projects, edit the `projects` section:
		 ```ts
		 projects: {
			 github: {
				 username: 'your-github-username',
				 // ...other options
			 },
			 external: {
				 header: 'My Projects',
				 projects: [
					 { title: 'Project Name', description: '...', imageUrl: '', link: 'https://...' },
					 // ...add more
				 ]
			 }
		 },
		 ```
	 - **Experience, Education, Certifications, Publications:**
		 ```ts
		 experiences: [
			 { company: 'Company', position: 'Role', from: '2022', to: '2023', companyLink: 'https://...' },
			 // ...
		 ],
		 educations: [
			 { institution: 'University', degree: 'Degree', from: '2018', to: '2022' },
			 // ...
		 ],
		 certifications: [
			 { name: 'Certification', body: 'Issuer', year: '2023', link: 'https://...' },
			 // ...
		 ],
		 publications: [
			 { title: 'Paper Title', authors: 'You', link: 'https://...', description: '...' },
			 // ...
		 ],
		 ```
	 - **Contact/Social Links:**
		 ```ts
		 social: {
			 linkedin: 'your-linkedin',
			 github: 'your-github',
			 // ...other social links
		 },
		 ```

3. **Save the file and restart the dev server** (if running):
	 - Changes will be reflected immediately in development mode.

4. **Add images** (if needed):
	 - Place custom images in the `public/assets` directory and reference them in your config (e.g., `/assets/your-image.png`).

---

For more advanced customization, see the comments in `gitprofile.config.ts` or the documentation in each section of the file.

## Deployment

You can deploy this site to Vercel, Netlify, GitHub Pages, or any static hosting provider.

## License

This project is open source and available under the [MIT License](LICENSE).

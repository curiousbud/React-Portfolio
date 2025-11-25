import React from 'react';
import { useFadeInSection } from '../hooks/useFadeInSection';
import CONFIG from '../../gitprofile.config';

const ContactMe: React.FC = () => {
  const [ref, isVisible] = useFadeInSection<HTMLElement>();
  const social = CONFIG.social || {};
  const socials = [
    { name: 'LinkedIn', url: social.linkedin && `https://linkedin.com/in/${social.linkedin}`, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg' },
    { name: 'Medium', url: social.medium && `https://medium.com/@${social.medium}`, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/medium/medium-original.svg' },
    { name: 'Instagram', url: social.instagram && `https://instagram.com/${social.instagram}`, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/instagram/instagram-original.svg' },
    { name: 'Facebook', url: social.facebook && `https://facebook.com/${social.facebook}`, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg' },
    { name: 'X', url: social.x && `https://x.com/${social.x}`, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg' },
    { name: 'YouTube', url: social.youtube && `https://youtube.com/${social.youtube}`, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/youtube/youtube-original.svg' },
    { name: 'Reddit', url: social.reddit && `https://reddit.com/user/${social.reddit}`, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reddit/reddit-original.svg' },
    { name: 'Threads', url: social.threads && `https://threads.net/@${social.threads}`, logo: '/assets/threads.svg' },
    { name: 'Telegram', url: social.telegram && `https://t.me/${social.telegram}`, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/telegram/telegram-original.svg' },
    { name: 'Website', url: social.website, logo: '/assets/website.svg' },
  ].filter(s => s.url);
  return (
    <section ref={ref} id="contact" className={`contact-me-section text-left py-16 fade-in-section${isVisible ? ' is-visible' : ''}`}>
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Contact Me</h2>
      <p className="mb-4 mt-4">Feel free to reach out! I'm open to collaboration and new opportunities.</p>
      <div className="inline-flex items-center bg-gray-700 text-white px-4 py-2 rounded shadow mb-4">
        <span className="mr-2">💬</span>
        <span>{social.email || 'akareeb662@gmail.com'}</span>
      </div>
      {socials.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-2">
          {socials.map((s, idx) => (
            <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-(--primary-color) underline hover:text-(--icon-color)">
              {s.logo && (
                <img src={s.logo} alt={s.name} className="w-5 h-5" style={{ display: 'inline-block' }} />
              )}
              <span>{s.name}</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default ContactMe;

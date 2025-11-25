import React from 'react';
import { useFadeInSection } from '../hooks/useFadeInSection';
import CONFIG from '../../gitprofile.config';

const ContactMe: React.FC = () => {
  const [ref, isVisible] = useFadeInSection<HTMLElement>();
  const social = CONFIG.social || {};
  const socials = [
    { name: 'LinkedIn', url: social.linkedin && `https://linkedin.com/in/${social.linkedin}` },
    { name: 'Medium', url: social.medium && `https://medium.com/@${social.medium}` },
    { name: 'Instagram', url: social.instagram && `https://instagram.com/${social.instagram}` },
    { name: 'Facebook', url: social.facebook && `https://facebook.com/${social.facebook}` },
    { name: 'X', url: social.x && `https://x.com/${social.x}` },
    { name: 'YouTube', url: social.youtube && `https://youtube.com/${social.youtube}` },
    { name: 'Reddit', url: social.reddit && `https://reddit.com/user/${social.reddit}` },
    { name: 'Threads', url: social.threads && `https://threads.net/@${social.threads}` },
    { name: 'Telegram', url: social.telegram && `https://t.me/${social.telegram}` },
    { name: 'Website', url: social.website },
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
            <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="text-(--primary-color) underline hover:text-(--icon-color)">{s.name}</a>
          ))}
        </div>
      )}
    </section>
  );
};

export default ContactMe;

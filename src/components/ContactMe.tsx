import React from 'react';
import { useFadeInSection } from '../hooks/useFadeInSection';


const ContactMe: React.FC = () => {
  const [ref, isVisible] = useFadeInSection<HTMLElement>();
  return (
    <section ref={ref} id="contact" className={`contact-me-section text-left py-16 fade-in-section${isVisible ? ' is-visible' : ''}`}>
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Contact Me</h2>
      <p className="mb-4 mt-4">Feel free to reach out! I'm open to collaboration and new opportunities.</p>
      <div className="inline-flex items-center bg-gray-700 text-white px-4 py-2 rounded shadow">
        <span className="mr-2">💬</span>
        <span>akareeb662@gmail.com</span>
      </div>
    </section>
  );
};

export default ContactMe;

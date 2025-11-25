import React from 'react';

const ContactMe: React.FC = () => (
  <section className="contact-me-section text-left max-w-3xl mx-auto my-8">
    <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Contact Me</h2>
    <p className="mb-4 mt-4">Feel free to reach out! I'm open to collaboration and new opportunities.</p>
    <div className="inline-flex items-center bg-gray-700 text-white px-4 py-2 rounded shadow">
      <span className="mr-2">💬</span>
      <span>AKAREEB662@GMAIL.COM</span>
    </div>
  </section>
);

export default ContactMe;

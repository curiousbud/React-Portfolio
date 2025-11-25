import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <section id="about" className="about-me pt-4 pb-4 flex flex-col justify-center items-center snap-start px-4 md:px-0">
      <div className="">
        <h1 className='border-b border-(--clr) text-4xl'>This is ME!</h1>
        <h2 className="text-2xl md:text-xl font-light text-left mb-8 text-(--icon-color)" style={{lineHeight: '1.1'}}>
          I believe in a user centered design approach, ensuring that every project I work on is tailored to meet the specific needs of its users.
        </h2>
        <div className="mt-10 border-t border-(--icon-color) pt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="block text-(--icon-color) mb-2">This is me.</span>
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white">Hi, I'm Tajmirul.</h3>
          </div>
          <div>
            <p className="text-lg text-(--icon-color) mb-4">
              I'm a frontend web developer dedicated to turning ideas into creative solutions. I specialize in creating seamless and intuitive user experiences.
            </p>
            <p className="text-lg text-(--icon-color)">
              My approach focuses on creating scalable, high-performing solutions tailored to both user needs and business objectives. By prioritizing performance, accessibility, and responsiveness, I strive to deliver experiences that not only engage users but also drive tangible results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
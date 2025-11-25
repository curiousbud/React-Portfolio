import React, { useRef, useEffect, useState } from 'react';

const skills = [
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

const LOGO_WIDTH = 80; // px (including margin)
const SPEED = 1; // px per frame

const Skills: React.FC = () => {
  const [positions, setPositions] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      // Initial positions: fill the container from right to left
      setPositions(Array(skills.length).fill(0).map((_, i) => containerRef.current!.offsetWidth + i * LOGO_WIDTH));
    }
  }, []);

  useEffect(() => {
    if (!containerWidth) return;
    let animationFrame: number;
    const animate = () => {
      setPositions(prev => {
        return prev.map((pos) => {
          let newPos = pos - SPEED;
          // If the logo has fully exited left, move it to the extreme right
          if (newPos < -LOGO_WIDTH) {
            newPos = containerWidth;
          }
          return newPos;
        });
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [containerWidth]);

  return (
    <section className="skills-section text-left my-8">
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Skills</h2>
      <div className="marquee-container overflow-x-hidden w-full py-4 relative" ref={containerRef} style={{height: '80px'}}>
        {positions.map((pos, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center min-w-20 absolute"
            style={{ left: pos, top: 0, width: LOGO_WIDTH, transition: 'none' }}
          >
            <img src={skills[idx % skills.length].logo} alt={skills[idx % skills.length].name} className="w-10 h-10 mb-2" />
            <span className="text-sm text-(--icon-color)">{skills[idx % skills.length].name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
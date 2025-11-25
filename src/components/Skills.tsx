import React, { useRef, useEffect, useState } from 'react';
import { useFadeInSection } from '../hooks/useFadeInSection';
import CONFIG from '../../gitprofile.config';
import { skillsMarquee } from '../assets/ts/skillsMarquee';

// Skill interface for type safety
interface Skill {
  name: string;
  logo?: string;
}

const LOGO_WIDTH = 80; // px (including margin)
const SPEED = 1; // px per frame

/**
 * The Skills component displays a horizontally scrolling (marquee) list of skill logos and names.
 * The animation logic is defined in src/assets/js/skillsMarquee.ts for maintainability and reusability.
 *
 * The animation works by updating the position of each logo using requestAnimationFrame.
 * When a logo exits the left edge, it re-enters from the right edge, creating a continuous snake-like effect.
 *
 * To adjust the animation, modify the logic in skillsMarquee.ts or the constants LOGO_WIDTH and SPEED here.
 */
const Skills: React.FC = () => {
  const [ref, isVisible] = useFadeInSection<HTMLElement>();
  // Support both array of strings and array of objects for backward compatibility
  const skills: Skill[] = (CONFIG.skills || []).map((skill: string | Skill) =>
    typeof skill === 'string' ? { name: skill } : skill
  );
  const [positions, setPositions] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  // Holds the width of the container for animation calculations
  const [containerWidth, setContainerWidth] = useState(0);
  // Holds the cleanup function for the animation frame
  const animationCleanup = useRef<(() => void) | undefined>(undefined);

  // Set up initial positions for the skills when the component mounts or skills change
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setPositions(Array(skills.length).fill(0).map((_, i) => containerRef.current!.offsetWidth + i * LOGO_WIDTH));
    }
  }, [skills.length]);

  // Start the marquee animation using the imported skillsMarquee helper
  useEffect(() => {
    if (!containerWidth) return;
    if (animationCleanup.current) animationCleanup.current();
    // skillsMarquee.start returns a cleanup function to stop the animation
    animationCleanup.current = skillsMarquee.start(setPositions, containerWidth, LOGO_WIDTH, SPEED);
    return () => {
      if (animationCleanup.current) animationCleanup.current();
    };
  }, [containerWidth]);

  return (
    <section id="skills" ref={ref} className={`skills-section text-left w-100% fade-in-section${isVisible ? ' is-visible' : ''}`}>
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Skills</h2>
      <div
        className="marquee-container overflow-x-hidden w-full relative"
        ref={containerRef}
        style={{ height: '80px' }}
      >
        {positions.map((pos, idx) => {
          const skill = skills[idx % skills.length];
          return (
            <div
              key={idx}
              className="flex flex-row items-center justify-center absolute bg-transparent"
              style={{
                left: pos,
                top: 0,
                width: LOGO_WIDTH - 10,
                height: '80px',
                transition: 'none',
                gap: '0.5rem',
                boxSizing: 'border-box',
              }}
            >
              {skill.logo && (
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-10 h-10 mr-2"
                  style={{ filter: 'drop-shadow(0 0 4px #222)' }}
                />
              )}
              <span
                className="text-base font-semibold text-[--icon-color] whitespace-nowrap"
                style={{ textShadow: '0 0 2px #000' }}
              >
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
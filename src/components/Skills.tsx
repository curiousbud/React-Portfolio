import React, { useRef, useEffect, useState } from 'react';
import { useFadeInSection } from '../hooks/useFadeInSection';
import CONFIG from '../utils/sanitizeConfig';
import { skillsMarquee } from '../assets/ts/skillsMarquee';


/**
 * Skill interface for type safety
 */
interface Skill {
  name: string;
  logo?: string;
}


// Logo width in px (adjust to prevent overlap)
const LOGO_WIDTH = 180;
// Marquee speed in px per frame
const SPEED = 1;

/**
 * Skills Section
 * Renders a horizontally scrolling marquee of skill logos and names.
 * Section is hidden (display: none) if no skills are present in config.
 * Uses sanitized CONFIG from utils/sanitizeConfig for data.
 *
 * Animation logic is in src/assets/ts/skillsMarquee.ts.
 */
const Skills: React.FC = () => {

  // Fade-in animation on scroll
  const [ref, isVisible] = useFadeInSection<HTMLElement>();
  // Normalize skills array from config (support string or object)
  const skills: Skill[] = (CONFIG.skills || []).map((skill: string | Skill) =>
    typeof skill === 'string' ? { name: skill } : skill
  );
  // State for logo positions and container width
  const [positions, setPositions] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  // Ref for animation cleanup
  const animationCleanup = useRef<(() => void) | undefined>(undefined);


  // Set up initial positions for the skills when the component mounts or skills change
  useEffect(() => {
    if (containerRef.current) {
      const baseWidth = containerRef.current.offsetWidth;
      setContainerWidth(baseWidth);
      setPositions(Array(skills.length).fill(0).map((_, i) => baseWidth + i * (LOGO_WIDTH + 40)));
    }
  }, [skills.length]);

  // Start/cleanup marquee animation
  useEffect(() => {
    if (!containerWidth) return;
    if (animationCleanup.current) animationCleanup.current();
    animationCleanup.current = skillsMarquee.start(setPositions, LOGO_WIDTH, SPEED);
    return () => {
      if (animationCleanup.current) animationCleanup.current();
    };
  }, [containerWidth, skills.length]);

  // Use CSS to hide section if no skills
  const sectionStyle = !skills.length ? { display: 'none' } : undefined;

  return (
    <section
      id="skills"
      ref={ref}
      className={`skills-section text-left w-100% pt-4 pb-4 fade-in-section${isVisible ? ' is-visible' : ''}`}
      style={sectionStyle}
    >
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Skills</h2>
      <div
        className="marquee-container w-full relative overflow-x-hidden"
        ref={containerRef}
        style={{ height: '80px', minWidth: `${skills.length * LOGO_WIDTH}px` }}
      >
        {positions.map((pos, idx) => {
          const skill = skills[idx % skills.length];
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center absolute bg-transparent"
              style={{
                left: pos,
                top: 0,
                width: LOGO_WIDTH - 10,
                minWidth: 160,
                height: '80px',
                transition: 'none',
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
                className="text-base font-semibold text-[--icon-color] whitespace-nowrap mt-2"
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

Skills.displayName = 'SkillsSection';
export default Skills;
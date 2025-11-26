// Handles the animation logic for the Skills marquee component

export interface MarqueeAnimation {
	start: (updatePositions: (cb: (prev: number[]) => number[]) => void, logoWidth: number, speed: number) => () => void;
}

export const skillsMarquee: MarqueeAnimation = {
	start: (updatePositions, logoWidth, speed) => {
		let animationFrame: number;
		const animate = () => {
			updatePositions(prev => {
				// Find the rightmost position
				const maxPos = Math.max(...prev);
				return prev.map((pos) => {
					let newPos = pos - speed;
					if (newPos < -logoWidth) {
						newPos = maxPos + logoWidth;
					}
					return newPos;
				});
			});
			animationFrame = requestAnimationFrame(animate);
		};
		animationFrame = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrame);
	},
};

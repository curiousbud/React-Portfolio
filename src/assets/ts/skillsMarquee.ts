// Handles the animation logic for the Skills marquee component

export interface MarqueeAnimation {
	start: (updatePositions: (cb: (prev: number[]) => number[]) => void, containerWidth: number, logoWidth: number, speed: number) => () => void;
}

export const skillsMarquee: MarqueeAnimation = {
	start: (updatePositions, containerWidth, logoWidth, speed) => {
		let animationFrame: number;
		const animate = () => {
			updatePositions(prev =>
				prev.map((pos) => {
					let newPos = pos - speed;
					if (newPos < -logoWidth) {
						newPos = containerWidth;
					}
					return newPos;
				})
			);
			animationFrame = requestAnimationFrame(animate);
		};
		animationFrame = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrame);
	},
};

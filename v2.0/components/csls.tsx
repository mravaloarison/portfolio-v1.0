import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { gsap } from "gsap";

interface CarouselProps {
	pictureLinks: string[];
	pictureAlts: string[];
	autoPlay?: boolean;
	interval?: number;
	isAboutPage?: boolean;
}

const ImageCarousel: React.FC<CarouselProps> = ({
	pictureLinks,
	pictureAlts,
	autoPlay = true,
	interval = 5000,
	isAboutPage = false,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState(0);
	const [direction, setDirection] = useState<"next" | "prev">("next");
	const [isAnimating, setIsAnimating] = useState(false);
	const [isPlaying, setIsPlaying] = useState(autoPlay);

	const carouselRef = useRef<HTMLDivElement>(null);
	const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

	if (pictureLinks.length !== pictureAlts.length) {
		console.error(
			"pictureLinks and pictureAlts arrays must have the same length"
		);
	}

	const animateSlide = (newIndex: number, dir: "next" | "prev") => {
		if (isAnimating || newIndex === currentIndex) return;
		setIsAnimating(true);
		setPrevIndex(currentIndex);
		setCurrentIndex(newIndex);
		setDirection(dir);
	};

	useEffect(() => {
		if (slidesRef.current.length === 0) return;
		const currentSlide = slidesRef.current[currentIndex];
		const prevSlide = slidesRef.current[prevIndex];

		if (!currentSlide || !prevSlide || currentIndex === prevIndex) {
			setIsAnimating(false);
			return;
		}

		gsap.set(currentSlide, {
			autoAlpha: 0,
			x: direction === "next" ? "100%" : "-100%",
			scale: 0.8,
		});

		const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });

		tl.to(prevSlide, {
			duration: 0.25,
			x: direction === "next" ? "-30%" : "30%",
			scale: 0.85,
			autoAlpha: 0,
			ease: "power1.in",
		});

		tl.to(
			currentSlide,
			{
				duration: 0.25,
				x: "0%",
				scale: 1,
				autoAlpha: 1,
				ease: "power1.out",
			},
			"-=0.25"
		);
	}, [currentIndex, prevIndex, direction]);

	const nextSlide = () => {
		if (isAnimating) return;
		const newIndex = (currentIndex + 1) % pictureLinks.length;
		animateSlide(newIndex, "next");
	};

	const prevSlide = () => {
		if (isAnimating) return;
		const newIndex =
			currentIndex === 0 ? pictureLinks.length - 1 : currentIndex - 1;
		animateSlide(newIndex, "prev");
	};

	const goToSlide = (index: number) => {
		if (isAnimating || index === currentIndex) return;
		const dir = index > currentIndex ? "next" : "prev";
		animateSlide(index, dir);
	};

	useEffect(() => {
		if (!isPlaying) return;

		const slideInterval = setInterval(() => {
			if (!isAnimating) nextSlide();
		}, interval);

		return () => clearInterval(slideInterval);
	}, [isPlaying, interval, isAnimating, currentIndex]);

	const togglePlay = () => {
		setIsPlaying((prev) => !prev);
	};

	const heightClasses = isAboutPage ? "min-h-96 lg:min-h-[66vh]" : "min-h-96";

	return (
		<div
			ref={carouselRef}
			className="relative w-full overflow-hidden rounded-2xl border border-gray-200"
		>
			<div className={`relative ${heightClasses} `}>
				{isAboutPage && (
					<button
						onClick={togglePlay}
						className="absolute left-4 top-8 transform -translate-y-1/2 bg-black/10 hover:bg-black/30 text-white rounded-full p-2 shadow-md z-10"
					>
						{isPlaying ? <Pause /> : <Play />}
					</button>
				)}

				{pictureLinks.map((src, index) => (
					<div
						key={index}
						ref={(el) => {
							slidesRef.current[index] = el;
						}}
						className="absolute inset-0 w-full h-full"
						style={{
							visibility:
								index === currentIndex || index === prevIndex
									? "visible"
									: "hidden",
						}}
					>
						<img
							src={src}
							alt={pictureAlts[index] || `Slide ${index + 1}`}
							className="object-cover md:object-scale-down h-full mx-auto"
						/>
					</div>
				))}

				<button
					onClick={prevSlide}
					disabled={isAnimating}
					className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/30 text-white rounded-full p-2 shadow-md z-10"
					aria-label="Previous slide"
				>
					<ChevronLeft size={24} />
				</button>

				<button
					onClick={nextSlide}
					disabled={isAnimating}
					className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/30 text-white rounded-full p-2 shadow-md z-10"
					aria-label="Next slide"
				>
					<ChevronRight size={24} />
				</button>
			</div>

			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
				{pictureLinks.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						disabled={isAnimating}
						className={`w-2 h-2 rounded-full transition-all duration-300 ${
							index === currentIndex
								? "bg-white scale-125"
								: "bg-white/50 hover:bg-white/80"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default ImageCarousel;

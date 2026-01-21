"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { about_me_pics } from "../fakedb";
import ImageCarousel from "@/components/csls";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	useGSAP(() => {
		gsap.fromTo(
			".main",
			{ x: 10, opacity: 0 },
			{ x: 0, duration: 0.2, opacity: 1 },
		);
	});

	function goBack() {
		gsap.to(".main", {
			x: -10,
			duration: 0.2,
			opacity: 0,
		});

		setTimeout(() => {
			router.back();
		}, 200);
	}

	return (
		<div className="w-screen h-screen main opacity-0 bg-white overflow-y-scroll">
			<div className="p-8 md:p-12 max-w-7xl w-full mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
				<button
					onClick={goBack}
					className="text-indigo-500 flex gap-2 items-center text-xl md:text-2xl font-semibold hover:cursor-pointer"
				>
					<ArrowLeft />
					Go back
				</button>

				<h1 className="pt-8 text-2xl md:text-3xl font-bold text-black">
					My Journey
				</h1>

				<p className="pt-4 pb-6">
					I am Mami, a recent graduate with a{" "}
					<span className="font-semibold text-black">
						BS in Computer Information Systems
					</span>{" "}
					and a minor in{" "}
					<span className="font-semibold text-black">
						Mathematics
					</span>
					. I am a{" "}
					<Link
						href="https://en.wikipedia.org/wiki/Madagascar"
						target="_blank"
						className="text-indigo-600 underline"
					>
						Madagascan
					</Link>
					, and I taught myself programming before I moved to the
					United States.
				</p>

				<ImageCarousel
					pictureLinks={about_me_pics}
					pictureAlts={about_me_pics}
					autoPlay={true}
					interval={2400}
					isAboutPage={true}
				/>

				<p className="pt-4">
					Coding and technology excite me, I love learning something
					new every day, collaborating with other people, and knowing
					that my work can make a positive impact.
				</p>

				<h2 className="pt-10 text-xl md:text-2xl font-bold text-black">
					My Hackathon Journey
				</h2>
				<p className="pt-4">
					As an international student at a non–brand-name university,
					I didn’t have the reputation advantage or easy access to
					internships. Because of{" "}
					<span className="font-semibold text-black">
						visa, SSN, hiring restrictions
					</span>
					, and my school limiting off-campus work; even getting
					on-campus jobs was difficult. Instead of giving up, I turned
					to{" "}
					<span className="font-semibold text-black">hackathons</span>{" "}
					to learn and gain real-world experience.
				</p>

				<p className="pt-4">
					Through{" "}
					<Link
						href="https://devpost.com/mrava?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"
						target="_blank"
						className="text-indigo-600 underline"
					>
						12 hackathon wins
					</Link>
					, I've earned over{" "}
					<span className="font-semibold text-black">$4,000</span> in
					prize money and connected with incredible teams and mentors.
				</p>

				<p className="pt-4">
					What I value most about the{" "}
					<span className="font-semibold text-black">
						hacker community
					</span>{" "}
					is being surrounded by people with similar energy, passions,
					and ambitions.
				</p>
				<p className="pt-4">
					I find it exciting to know that someday, I'll be able to say
					I have{" "}
					<span className="text-black font-bold">
						friends from all over the world
					</span>
					.
				</p>

				<h2 className="pt-10 text-xl md:text-2xl font-bold text-black">
					My Interests
				</h2>
				<p className="pt-4">
					In my free time, I enjoy playing the bass, piano, guitar,
					chess, working out, reading manga, watching anime, and
					occasionally playing video games.
				</p>
			</div>
		</div>
	);
}

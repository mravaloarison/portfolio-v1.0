import { technologies } from "@/app/fakedb";
import ImageCarousel from "./csls";
import { Link2 } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

interface Technology {
	name: string;
	icon: string;
}

interface BadgeStyle {
	text: string;
	bg: string;
	textColor: string;
}

export default function ProjectCard({
	title,
	description,
	year,
	ts,
	screenshots,
	githubLink,
	note,
}: {
	title: string;
	description: string;
	year: string;
	ts: string[];
	screenshots: string[];
	githubLink: string;
	note?: string;
}) {
	const router = useRouter();

	const newTechnologies = (): Technology[] => {
		return technologies.filter((tech) => ts.includes(tech.name));
	};

	function goToAProject(githubLink: string) {
		gsap.to(".main", { x: 0.2, duration: 0.2, opacity: 0 });
		setTimeout(() => {
			router.push(`/project?repo=${githubLink}`);
		}, 200);
	}

	const getNoteBadge = (note: string | undefined): BadgeStyle | null => {
		if (!note) return null;

		const badgeMap: Record<string, BadgeStyle> = {
			a: {
				text: "▶️ Available live",
				bg: "bg-blue-100",
				textColor: "text-blue-800",
			},
			h: {
				text: "🏆 Hackathon Winner",
				bg: "bg-yellow-100",
				textColor: "text-yellow-800",
			},
			v: {
				text: "👁️ Computer Vision",
				bg: "bg-gray-200",
				textColor: "text-gray-800",
			},
			f: {
				text: "🐥 First Hack",
				bg: "bg-indigo-100",
				textColor: "text-indigo-800",
			},
		};

		return badgeMap[note] || null;
	};

	const badge = getNoteBadge(note);

	return (
		<div className="flex flex-col gap-6">
			<div>
				<ImageCarousel
					pictureLinks={screenshots}
					pictureAlts={screenshots}
					autoPlay={false}
					interval={5000}
				/>
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<button
						onClick={() => goToAProject(githubLink)}
						className="flex items-center gap-2 group"
					>
						<h1 className="text-2xl font-semibold text-black group-hover:underline">
							{title}
						</h1>
						<Link2 className="text-black" />
					</button>

					{badge && (
						<span
							className={`text-xs ${badge.bg} ${badge.textColor} px-2 py-1 rounded-full font-medium`}
						>
							{badge.text}
						</span>
					)}
				</div>

				<p className="text-lg text-gray-500 font-medium leading-snug truncate">
					{description}
				</p>

				<div className="flex flex-wrap gap-2.5">
					{newTechnologies().map((tech) => (
						<div
							key={tech.name}
							className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 bg-white shadow-sm"
						>
							<div className="w-6 overflow-hidden flex items-center justify-center">
								<img
									src={tech.icon}
									alt={tech.name}
									className="h-5 object-cover"
								/>
							</div>
							<span className="text-sm font-semibold text-gray-600">
								{tech.name}
							</span>
						</div>
					))}
				</div>

				<div className="text-sm text-gray-700 font-semibold">
					{year}
				</div>
			</div>
		</div>
	);
}

import Link from "next/link";

export default function SocialMediaView({
	mediaName,
	mediaLink,
	mediaIcon,
}: {
	mediaName: string;
	mediaLink: string;
	mediaIcon: string;
}) {
	return (
		<Link
			href={mediaLink}
			target="_blank"
			className="md:w-12 w-6 h-6 md:h-12 flex items-center justify-center border border-gray-200 rounded-full hover:shadow-lg transition duration-300 ease-in-out"
		>
			<img
				src={mediaIcon}
				alt={mediaName}
				className="md:w-10 w-5 h-5 md:h-10 object-contain"
			/>
		</Link>
	);
}

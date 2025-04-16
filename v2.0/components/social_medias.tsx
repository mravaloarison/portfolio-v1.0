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
			className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full hover:shadow-lg transition duration-300 ease-in-out"
		>
			<img
				src={mediaIcon}
				alt={mediaName}
				className="w-10 h-10 object-contain"
			/>
		</Link>
	);
}

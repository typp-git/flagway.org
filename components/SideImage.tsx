import Image from 'next/image';
import React from 'react';

interface SideImageProps {
	src: string;
	alt: string;
	width: number;
	position: "left" | "right"
}

const SideImage: React.FC<SideImageProps> = ({ src, alt, width, position = "left" }) => {
	return (
	// 	<Image
	// 	alt=""
	// 	height="200"
	// 	className="landing-photo aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[1.1] contrast-125"
	// />
		<div
			className={`absolute top-1/2 transform hover:scale-[1.03] transition-all rounded-lg overflow-hidden shadow-lg ${
				position === 'left' ? '-left-14 rotate-[10deg]' : 'right-0 -rotate-[10deg]'
			}`}
		>
			<Image src={src} alt={alt} width={width} className="block w-[0.3] md:w-full aspect-[2/3] rounded-xl bg-gray-900/5 object-cover" />
		</div>
	);
};

export default SideImage;

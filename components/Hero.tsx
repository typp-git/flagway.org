import React from 'react';
import Image from 'next/image';
import FloorWork from "@/public/photos/floor-work.jpg"
import Team2 from "@/public/photos/team_2.jpg"
import Winners from "@/public/photos/winners.jpg"
import MIT from "@/public/photos/mit.jpg"
import Outdoors from "@/public/photos/outdoors.jpg"
import TextCarousel from "@/components/TextCarousel";
import Link from 'next/link';

const Hero: React.FC = () => {
	return (
		<div className='overflow-hidden'>
			<div className="relative isolate">
				<div
					aria-hidden="true"
					className="absolute top-[35rem] sm:left-[40%] sm:top-[20rem] lg:top-[5rem] -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
				>
					<div
						style={{
							clipPath:
								'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
						}}
						className="aspect-[11/8] w-[60rem] bg-gradient-to-tr from-[#ffe206] to-[#b00e0e] opacity-40"
					/>
				</div>
				<div
					aria-hidden="true"
					className="absolute -left-[30rem] top-[30rem] sm:-left-[10rem] lg:left-[20%] sm:top-[30rem] lg:top-[5rem] -z-10 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
				>
					<div
						style={{
							clipPath:
								'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
						}}
						className="aspect-[11/8] w-[60rem] bg-gradient-to-tr h-full from-[#31ba3c] to-[#4ab7ff] opacity-40"
					/>
				</div>
			</div>
			<div className="overflow-hidden">
				<div className="mx-auto max-w-7xl px-6 pb-32 pt-16 sm:pt-32 lg:px-8 lg:pt-16">
					<div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
						<div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Where students
								<TextCarousel />
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-[40rem]">
								Flagway™ blends strategy, athleticism, and mathematical mastery in communities of young people around the world.
							</p>
							<div className="mt-10 flex items-center gap-x-6">
								<Link
									href="/about"
									className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
								>
									Learn more
								</Link>
								<Link href="/tournament" className="text-sm font-semibold leading-6 text-gray-900">
									Tournament <span aria-hidden="true">→</span>
								</Link>
							</div>
						</div>
						<div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0 relative">
							<div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
								<div className="relative">
									<Image
										alt=""
										src={Winners}
										height="200"
										className="landing-photo aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[1.1] contrast-[1.1]"
									/>
								</div>
							</div>
							<div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
								<div className="relative">
									<Image
										alt=""
										src={Outdoors}
										height="200"
										className="landing-photo aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[1.1] contrast-125"
									/>
								</div>
								<div className="relative">
									<Image
										alt=""
										src={FloorWork}
										height="200"
										className="landing-photo aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[1.1] brightness-125"
									/>
								</div>
							</div>
							<div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
								<div className="relative">
									<Image
										alt=""
										src={Team2}
										height="200"
										className="landing-photo aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[1.1] contrast-[1.1] brightness-110"
									/>
								</div>
								<div className="relative">
									<Image
										alt=""
										src={MIT}
										height="200"
										className="landing-photo aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[1.1] contrast-125"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
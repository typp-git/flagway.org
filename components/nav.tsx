"use client"
import Image from "next/image";
import YPPLogo from "@/public/YPP-Logo-white.webp"
import Structures from "@/public/structures.png"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

// TAILWIND UI "SIMPLE" NAVBAR

export default function Navbar() {
	return (
		<Disclosure as="nav" style={{backgroundImage: "url('structures.png')"}}className="shadow z-[-2] bg-black px-4 sm:px-10 text-white">
			<div className="mx-auto relative max-w-7xl px-4 sm:px-6 lg:px-8 z-0">
				{/* <Image className="absolute inset-0 w-full h-full object-cover select-none z-[-1] pointer-events-none brightness-150" alt="blurred flagway structures" priority src={Structures} /> */}
				<div className="flex z-10 h-20 justify-between">
					<div className="flex">
						<div className="flex flex-shrink-0 items-center">
							<a href="/" className="flex items-center gap-4 hover:cursor-pointer">
								<Image priority alt="Logo of the Young People's Project" width="100" src={YPPLogo} />
								<div className="brand items-center">
									<div className="w-full">FLAGWAY</div>
									<div className="w-full -mt-1.5">LEAGUE</div>
								</div>
							</a>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
							<a href="/about" className="nav-item">About</a>
							<a href="/tournament" className="nav-item">Tournament</a>
							<a href="/training" className="nav-item">Training</a>
							<a href="/get-involved" className="nav-item">Get Involved</a>
							{/* <a href="/near-me" className="nav-item">Flagway Near You</a> */}
							{/* <a href="/login" className="nav-item">Log In</a> */}
						</div>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<button
							type="button"
							className="relative rounded-full bg-black p-1 text-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
						>
							<span className="absolute -inset-1.5" />
							<span className="sr-only">View notifications</span>
							<BellIcon aria-hidden="true" className="h-6 w-6" />
						</button>

						{/* Profile dropdown */}
						{/* <Menu as="div" className="relative ml-3">
							<div>
								<MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
									<span className="absolute -inset-1.5" />
									<span className="sr-only">Open user menu</span>
									<Image
										alt=""
										src=""
										width={32}
										height={32}
										className="h-8 w-8 rounded-full"
									/>
								</MenuButton>
							</div>
							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
							>
								<MenuItem>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
										Your Profile
									</a>
								</MenuItem>
								<MenuItem>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
										Settings
									</a>
								</MenuItem>
								<MenuItem>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
										Sign out
									</a>
								</MenuItem>
							</MenuItems>
						</Menu> */}
					</div>
					<div className="-mr-2 flex items-center sm:hidden">
						{/* Mobile menu button */}
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
							<XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
						</DisclosureButton>
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 pb-3 pt-2">
					{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
					<DisclosureButton
						as="a"
						href="#"
						className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
					>
						Dashboard
					</DisclosureButton>
					<DisclosureButton
						as="a"
						href="#"
						className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
					>
						Team
					</DisclosureButton>
					<DisclosureButton
						as="a"
						href="#"
						className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
					>
						Projects
					</DisclosureButton>
					<DisclosureButton
						as="a"
						href="#"
						className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
					>
						Calendar
					</DisclosureButton>
				</div>
				<div className="border-t border-gray-200 pb-3 pt-4">
					<div className="flex items-center px-4">
						<div className="flex-shrink-0">
							<Image
								alt=""
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								width={32}
								height={32}
								className="h-8 w-8 rounded-full"
							/>
						</div>
						<div className="ml-3">
							<div className="text-base font-medium text-gray-800">Tom Cook</div>
							<div className="text-sm font-medium text-gray-500">tom@example.com</div>
						</div>
						<button
							type="button"
							className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<span className="absolute -inset-1.5" />
							<span className="sr-only">View notifications</span>
							<BellIcon aria-hidden="true" className="h-6 w-6" />
						</button>
					</div>
					<div className="mt-3 space-y-1">
						<DisclosureButton
							as="a"
							href="#"
							className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
						>
							Your Profile
						</DisclosureButton>
						<DisclosureButton
							as="a"
							href="#"
							className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
						>
							Settings
						</DisclosureButton>
						<DisclosureButton
							as="a"
							href="#"
							className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
						>
							Sign out
						</DisclosureButton>
					</div>
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}


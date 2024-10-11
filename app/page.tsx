import Container from "@/components/container";
import Hero from "@/components/Hero";
// import SideImage from "@/components/SideImage";
// import Breaker from "@/public/photos/breaker.jpg"
// import Loading from "./loading";
// import Structure from "@/public/single-struct.png"

export default function Home() {
  return (
    <div className="bg-white">
      <main>
        <Hero />
        <Container>
          <div className="float-right md:w-[45rem] mb-10">
            <h1>Some landing page content will go here.</h1>
            <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p className="text-xl">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          {/* <div className="relative w-full">
            <SideImage src={Breaker} width={380} alt="student running victoriously" position="left" />
          </div> */}
        </Container>
      </main >

    </div >
  )
}

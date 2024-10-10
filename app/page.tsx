import Container from "@/components/container";
import Hero from "@/components/Hero";
// import Loading from "./loading";
// import Structure from "@/public/single-struct.png"

export default function Home() {
  return (
    <div className="bg-white">
      <main>
        <div className="overflow-x-hidden overflow-y-visible">
          <Hero />
          <Container>
            <h1>Some landing page content will go here.</h1>
          </Container>
        </div>
      </main >
    </div >
  )
}

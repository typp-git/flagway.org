"use client";

import Container from "@/components/container";
import Image from "next/image";

export default function NFT2025Page() {
  return (
    
    <Container>
      {/* <h1 className="text-4xl font-bold text-center mb-8">Cambridge Tournament 2025</h1> */}

      <div className="pt-10 flex justify-center">
      <div className="w-[90vw] max-w-[1920px]">
      <Image
      src="/photos/2025nft.png"
      alt="Flagway team totals and sponsors"
      width={1920}
      height={1080}
      className="rounded-3xl w-full h-auto"
    />
  </div>


        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onmessage = (e) => {
                if (e.data.hasOwnProperty("frameHeight")) {
                  document.getElementById("iframe-" + e.data.board_token).style.height = \`\${e.data.frameHeight + 40}px\`;
                }
              }
            `,
          }}
        />
      </div>
      {/* 

      <div className="w-full min-h-[800px]">
        <iframe
          id="iframe-qcbgblrnbqgne"
          src="https://keepthescore.com/embed/qcbgblrnbqgne/"
          style={{ width: "100%", height: "1000px", border: "none" }}
          scrolling="no"
        />


      </div>
*/}
      <div className="pt-10 w-full min-h-[800px]">
        <iframe
          id="iframe-bmxfxskbrstve"
          src="https://keepthescore.com/embed/bmxfxskbrstve/"
          style={{ width: "100%", height: "1000px", border: "none" }}
          scrolling="no"
        />
      </div>

      <div className="pt-10 w-full min-h-[800px]">
        <iframe
          id="iframe-dtkhdjcjbgcme"
          src="https://keepthescore.com/embed/dtkhdjcjbgcme/"
          style={{ width: "100%", height: "1000px", border: "none" }}
          scrolling="no"
        />
      </div>
    </Container>
  );
}

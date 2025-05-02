"use client";

import Container from "@/components/container";

export default function CMB2025Page() {
  return (
    <Container>
      {/* <h1 className="text-4xl font-bold text-center mb-8">Cambridge Tournament 2025</h1> */}
      <div className="w-full min-h-[800px]">
        <iframe 
          id="iframe-ygryjndbdctjr" 
          src="https://keepthescore.com/embed/ygryjndbdctjr/"
          style={{width: "100%", height: "100%", border: "none"}}
          scrolling="no"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onmessage = (e) => {
                if (e.data.hasOwnProperty("frameHeight")) {
                  document.getElementById("iframe-" + e.data.board_token).style.height = \`\${e.data.frameHeight + 40}px\`;
                }
              }
            `
          }}
        />
      </div>
    </Container>
  );
}


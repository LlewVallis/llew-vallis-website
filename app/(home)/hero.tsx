import { ReactNode } from "react";
import BackgroundAnimation from "./background-animation";

export default function Hero() {
  return (
    <div
      className="h-[450px] relative text-neutral-100"
      style={{
        clipPath: "polygon(0% 0%, 100% 0, 100% calc(100% - 5vw), 0% 100%)",
        background:
          "radial-gradient(circle at top left, #ec4899 0%, #8b5cf6 100%)",
      }}
    >
      <Layer>
        <BackgroundAnimation />
      </Layer>
      <Layer>
        <Content />
      </Layer>
      <Layer>
        <Shadow />
      </Layer>
    </div>
  );
}

function Layer({ children }: { children: ReactNode }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {children}
    </div>
  );
}

function Shadow() {
  const color = "rgba(0, 0, 0, 0.1)";
  const blackPoint = "calc(0.05 * 100vw)";
  const fadePoint = "calc(0.05 * 100vw + 10px)";

  return (
    <div
      className="h-full"
      style={{
        background: `linear-gradient(-2.8624deg, ${color} ${blackPoint}, transparent ${fadePoint})`,
      }}
    />
  );
}

function Content() {
  return (
    <div className="flex flex-col justify-center h-[85%] mx-20 text-center md:text-left">
      <h1 className="fredoka font-bold text-8xl select-none drop-shadow">
        <div>Hey,</div>
        <div>I&apos;m Llew.</div>
      </h1>
    </div>
  );
}

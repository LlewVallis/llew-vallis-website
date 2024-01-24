import { ReactNode } from "react";
import BackgroundAnimation from "./background-animation";

export default function Hero() {
  return (
    <div
      className="h-[450px] relative text-neutral-100 bg-gradient-to-r from-rose-500 to-pink-500"
      style={{
        clipPath: "polygon(0% 0%, 100% 0, 100% calc(100% - 5vw), 0% 100%)",
      }}
    >
      <Layer>
        <BackgroundAnimation />
      </Layer>
      <Layer>
        <Content />
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

function Content() {
  return (
    <div className="flex flex-col justify-center h-[85%] mx-20 text-center md:text-left">
      <h1 className="fredoka font-bold text-8xl select-none">
        <div>Hey,</div>
        <div>I&apos;m Llew.</div>
      </h1>
    </div>
  );
}

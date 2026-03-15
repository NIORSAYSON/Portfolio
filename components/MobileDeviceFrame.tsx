import Image from "next/image";

interface MobileDeviceFrameProps {
  src: string;
  alt: string;
}

export default function MobileDeviceFrame({
  src,
  alt,
}: MobileDeviceFrameProps) {
  return (
    <div className="relative mx-auto border-10 md:border-12 border-neutral-800 bg-neutral-800 rounded-4xl md:rounded-[2.5rem] shadow-xl w-full max-w-40 md:max-w-[220px] aspect-[9/19.5] shrink-0 flex items-center justify-center">
      {/* Dynamic Island / Camera Pill */}
      <div className="absolute top-1.5 md:top-0.5 inset-x-0 h-4 md:h-5 w-[30%] bg-black rounded-full mx-auto z-20"></div>

      {/* Side Buttons (Hardware Details) */}
      <div className="absolute top-16 md:top-20 -left-3 md:-left-3.5 w-0.5 h-4 md:h-5 bg-neutral-700 rounded-l-md"></div>
      <div className="absolute top-24 md:top-28 -left-3 md:-left-3.5 w-0.5 h-8 md:h-10 bg-neutral-700 rounded-l-md"></div>
      <div className="absolute top-36 md:top-40 -left-3 md:-left-3.5 w-0.5 h-8 md:h-10 bg-neutral-700 rounded-l-md"></div>
      <div className="absolute top-28 md:top-32 -right-3 md:-right-3.5 w-0.5 h-12 md:h-14 bg-neutral-700 rounded-r-md"></div>

      {/* Screen Container */}
      <div className="relative w-full h-full rounded-[1.4rem] md:rounded-[1.8rem] overflow-hidden bg-white dark:bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 160px, 220px"
        />
      </div>
    </div>
  );
}

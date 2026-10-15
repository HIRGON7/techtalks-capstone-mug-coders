
import Image from "next/image";

export default function RosePet() {
  return (
    <Image
      src="/themes/forbidden-love/rose-pet-jump.gif"
      alt=""
      width={96}
      height={112}
      unoptimized
      aria-hidden="true"
      className="rose-pet pointer-events-none select-none"
    />
  );
}

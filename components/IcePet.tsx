
import Image from "next/image";

export default function IcePet() {
  return (
    <Image
      src="/themes/frostfall/ice-pet.gif"
      alt=""
      width={96}
      height={112}
      unoptimized
      aria-hidden="true"
      className="ice-pet pointer-events-none select-none"
    />
  );
}

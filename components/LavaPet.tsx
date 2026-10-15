
import Image from "next/image";

export default function LavaPet() {
  return (
    <Image
      src="/themes/armageddon/armageddon-lava-pet-smooth.gif"
      alt="Angry lava pet"
      width={96}
      height={112}
      unoptimized
      className="lava-pet pointer-events-none select-none"
    />
  );
}

import Title from "@/components/title/Title";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Title> La Taverne</Title>

    <Image
      src="/images/taverne.webp"
      alt="La Taverne"
      width={1000}
      height={1000}
      className="mx-auto my-8 w-[500px] h-[500px]"
    />
    </>
  );
}

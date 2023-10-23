import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Your Company</span>
      <Image
        className="h-4 w-auto"
        src="/next.svg"
        alt=""
        width={200}
        height={200}
        priority={true}
      />
    </Link>
  );
};

export default Logo;

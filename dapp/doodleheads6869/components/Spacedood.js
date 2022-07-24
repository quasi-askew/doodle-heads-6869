import Image from "next/image";
import spaceDoodGif from "../public/space-dood.gif";

const Spacedood = ({}) => {
  return (
    <div className="bg-green-500">
      <div className="mx-auto max-w-sm">
        <Image
          alt="Space Dood 6869"
          src={spaceDoodGif}
          layout="responsive"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default Spacedood;

import { MotionConfig } from "framer-motion";
import Image from "next/image";
import spaceDoodGif from "../public/space-dood.gif";
import {
  motion
} from "framer-motion";

const Spacedood = ({ }) => {

  return (
    <div className="mt-8 mx-auto max-w-sm">
      <h2 className="text-white my-5 text-xl font-extrabold ">You are minting a head! Weeeee!!!</h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          alt="Space Dood 6869"
          src={spaceDoodGif}
          layout="responsive"
          width={600}
          height={600}
        />
      </motion.div>
    </div>
  );
};

export default Spacedood;

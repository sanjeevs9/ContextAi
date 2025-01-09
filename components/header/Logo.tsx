import Image from 'next/image';
import logo from "@/utils/4-1 ContextAi logo_w_name_c1+white_horizontal.png";

export function Logo() {
  return (
    <div className="flex items-center space-x-10">
      <Image src={logo} alt="Context AI" width={140} height={120} />
      {/* <Brain className="w-8 h-8 text-[#00FFC8]" /> */}
      {/* <span className="text-xl font-bold text-white">Context AI</span> */}
    </div>
  );
}
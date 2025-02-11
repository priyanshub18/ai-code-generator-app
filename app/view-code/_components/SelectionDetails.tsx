import React from "react";
import { RECORD } from "../[uid]/page";
import Image from "next/image";
import { Input } from "postcss";
import { Button } from "@/components/ui/button";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Loader2 } from "lucide-react";
function SelectionDetails({ record , regenerateCode , isReady }: any) {
  return (
    record && (
      <div className="p-5 bg-gray-200 h-[80vh] rounded-xl">
        <h2 className="font-bold my-2">WireFrame : </h2>
        <Image src={record?.imageUrl} alt="wireframe" width={300} height={300} className="rounded-xl object-contain h-[200px] bg-white w-full border border-dashed p-2 hover:transition-all hover:bg-gray-50 hover:shadow-md transition-all" />
        <h2 className="font-bold my-2">Model Used : </h2>
        <h2 className="bg-white p-2 rounded-md border border-solid hover:transition-all hover:bg-gray-50 hover:shadow-md ">{record?.model}</h2>

        <h2 className="font-bold my-2">Description provided : </h2>
        <h2 className="bg-white p-2 rounded-md border border-solid h-[300px] hover:transition-all hover:bg-gray-50 hover:shadow-md ">{record?.description}</h2>
        <Button className=" p-4 my-3 w-full" disabled={!isReady} onClick={regenerateCode}>
          {isReady ? <FaWandMagicSparkles /> : <Loader2 className="animate-spin" />}
          {/* <FaWandMagicSparkles /> */}
          Regenerate Code
        </Button>
      </div>
    )
  );
}

export default SelectionDetails;

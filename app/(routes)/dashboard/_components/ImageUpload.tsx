"use client";
import { Button } from "@/components/ui/button";
import { BookOpenTextIcon, Bot, CloudUploadIcon, ImageUp, WandSparkles, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function ImageUpload() {
  const AiModelList = [
    {
      name: "Gemini Google",
      icon: "/google.png",
    },
    {
      name: "Llama by Meta",
      icon: "/meta.png",
    },
    {
      name: "Deep Seek",
      icon: "/deepseek.png",
    },
  ];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      console.log(file[0]);
      const imageUrl = URL.createObjectURL(file[0]);
      setPreviewUrl(imageUrl);
    }
  };
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {!previewUrl ? (
          <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center  aspect-square hover:bg-gray-50 ease-in-out duration-300 ">
            <CloudUploadIcon className="h-10 w-10 " />
            <h2 className="text-center text-lg font-semibold text-gray-800 dark:text-white">Upload Image</h2>

            <p className="text-gray-500 mt-3 ">Select the Design/Figma Image</p>
            <div className="p-5">
              <label htmlFor="imageSelect">
                <h2
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap 
rounded-md text-sm font-medium transition-colors 
focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
disabled:pointer-events-none disabled:opacity-50 
[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
bg-primary text-primary-foreground shadow hover:bg-primary/90 
h-9 px-4 py-2 w-full"
                >
                  <ImageUp />
                  Select Image
                </h2>
              </label>
            </div>
            <input type="file" id="imageSelect" className="hidden" onChange={OnImageSelect} multiple={false} />
          </div>
        ) : (
          <div className="border-dashed border rounded-md  flex flex-col items-center justify-center  aspect-square ">
            <Image src={previewUrl} alt="preview" width={500} height={500} className="w-full h-300 object-contain" />
            <X className="hover:text-red-600 hover:scale-105 cursor-pointer" onClick={() => setPreviewUrl(null)} />
          </div>
        )}
        <div className="p-7 border shadow-md rounded-sm">
          <h2 className="font-bold text-lg mb-2 flex flex-row gap-2">
         
          Select AI model</h2>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem> */}
              {AiModelList.map((item, index) => (
                <SelectItem key={index} value={item.name}>
                  <div className="flex items-center gap-x-2">
                    <Image src={item.icon} alt="icon" width={20} height={20} />
                    <span className="font-normal">{item.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <h2 className="mt-2 font-bold text-lg flex flex-row gap-2">
                {/* <BookOpenTextIcon/> */}
            Enter description about your Webpage</h2>

          <Textarea className="my-2 h-[200px]" placeholder="Write about your webpage here..." />
          <div className=" mt-10 w-full">
            <Button className="w-full">
              <WandSparkles />
              Convert to Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;

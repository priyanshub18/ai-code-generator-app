"use client";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { setLazyProp } from "next/dist/server/api-utils";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";

interface RECORD {
  id: number;
  // uid: string;
  imageUrl: string;
  model: string;
  description: string;
  createdBy: string;
  code: any;
}
function ViewCode() {
  const { uid } = useParams();
  const [loading , setloading] = useState(false);
  const GetRecordInfo = async () => {
    try {
      setloading(true);
      const res = await axios.get(`/api/wireframe-to-code?uid=${uid}`);
      console.log(res.data);

      const response = res?.data;

      if (response?.code == null) {
        GenerateCode(response);
      }

      setloading(false);
    } catch (e) {
      toast({
        title: "Error : Something went wrong",
        // type: "error",
      });

      console.log(e);
    }
  };

  const GenerateCode = async (resp: RECORD) => {
    setloading(true);
    const res = await fetch("/api/ai-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.OPEN_ROUTER_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: resp.model,
        description: resp.description,
        imageUrl: resp.imageUrl,
      }),
    });

    if (!res.body) {
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value);
      console.log(chunk);
    }
    setloading(false);
  };

  useEffect(() => {
    uid && GetRecordInfo();
  }, [uid]);
  return <div>
    {loading && <LoaderCircle className="animate-spin" />}
    
  </div>;
}

export default ViewCode;

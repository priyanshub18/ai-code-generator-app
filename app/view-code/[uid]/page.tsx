"use client";
import AppHeader from "@/app/_components/AppHeader";
import SelectionDetails from "@/app/view-code/_components/SelectionDetails";
import Constants from "@/data/Constants";
import { toast } from "@/hooks/use-toast";
import CodeEditor from "../_components/CodeEditor";
import axios from "axios";
import { Loader2, LoaderCircle } from "lucide-react";
import { setLazyProp } from "next/dist/server/api-utils";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export interface RECORD {
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
  const [loading, setloading] = useState(false);
  const [code, setCode] = useState("");
  const [record, setRecord] = useState<RECORD | null>();
  const [isReady, setIsReady] = useState(false);
  const GetRecordInfo = async () => {
    try {
      setloading(true);
      const res = await axios.get(`/api/wireframe-to-code?uid=${uid}`);
      console.log(res.data);
      const response = res?.data;
      setRecord(res?.data);

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
    setIsReady(false);
    setCode("");
    setloading(true);
    const res = await fetch("/api/ai-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.OPEN_ROUTER_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: resp.model,
        description: resp.description + ":" + Constants.PROMPT_OLD,
        imageUrl: resp.imageUrl,
      }),
    });
    console.log(res);
    if (!res.body) {
      return;
    }

    setloading(false);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      const chunk = decoder.decode(value).replace("```typescript", "").replace("```", "").replace("javascript", "");
      setCode((prev) => prev + chunk);
      console.log(chunk);
    }
    setIsReady(true);
  };

  useEffect(() => {
    uid && GetRecordInfo();
  }, [uid]);
  return (
    <div>
      {/* {loading && <LoaderCircle className="animate-spin" />}
      <div>{code}</div> */}

      <AppHeader hideSideBar={true} />
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        <div>
          {/* SelectionDetails */}
          <SelectionDetails record={record} regenerateCode={() => GetRecordInfo()} isReady={isReady} />
        </div>
        <div className="col-span-4">
          {/* CodeEditor */}
          {loading ? (
            <div className="">
              <h2 className="font-bold text-3xl flex flex-row items-center justify-center p-20 bg-slate-100 h-[80vh] rounded-xl">
                <Loader2 className="animate-spin" />
                <div className="h-[10px] w-[10px] ml-2"></div>
                Analysing the WireFrame...
              </h2>
            </div>
          ) : (
            <CodeEditor codeResp={code} isReady={isReady} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;

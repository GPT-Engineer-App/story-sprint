import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [text, setText] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isWriting) {
      timerRef.current = setTimeout(() => {
        setText("");
        setIsWriting(false);
      }, 5000);
    }

    return () => clearTimeout(timerRef.current);
  }, [text, isWriting]);

  const handleChange = (e) => {
    setText(e.target.value);
    setIsWriting(true);
    clearTimeout(timerRef.current);
  };

  const handleStart = () => {
    setShowTutorial(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4">
      {showTutorial ? (
        <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Welcome to Keep Writing!</DialogTitle>
              <DialogDescription>
                Your task is to write a short story. If you stop writing for 5 seconds, all of your progress will be deleted. Click the button below to start.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleStart}>Start Writing</Button>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="w-full max-w-2xl">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <textarea
                  className="w-full h-64 p-4 border rounded-md"
                  value={text}
                  onChange={handleChange}
                  placeholder="Start writing your story..."
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Keep writing! If you stop for 5 seconds, your progress will be lost.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default Index;
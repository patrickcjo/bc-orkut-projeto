import { useState, useEffect } from "react";
import { ImagemComponent } from "./ImageComponent";

interface FooterProps {
  className: string;
}

export const Footer = ({ className }: FooterProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); 

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <div className="mt-20">
      <div
        className={` fixed w-screen  bottom-0 py-4 text-pink-300 font-bold px-12 ${className}`}>
        {formattedTime} - {formattedDate}
      </div>
    </div>
  );
};

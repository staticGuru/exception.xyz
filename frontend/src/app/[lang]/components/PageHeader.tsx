import React from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
interface PageHeaderProps {
  heading: string;
  text?: string;
}

export default function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className="container my-14 px-12 text-left">
      {text && <span className="text-slate-500 font-bold">{text}</span>}
      <div className="flex items-center justify-start">
        <h2 className="text-4xl my-2 mr-2 lg:text-5xl font-bold font-heading text-pink-500">
          {heading}
        </h2>
        <GiArtificialIntelligence color="#facd13" size="2.5em"/>
      </div>
    </div>
  );
}

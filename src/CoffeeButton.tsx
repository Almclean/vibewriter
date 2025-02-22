import React, { useEffect, useRef } from "react";

export default function Buymeacoffee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.setAttribute("data-name", "BMC-Widget");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", "alistaim");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute(
      "data-message",
      "Help us keep the synthwave vibes flowing by buying me a coffee ✨",
    );
    script.setAttribute("data-color", "#FFDD00");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;

    // Add script to document head
    document.head.appendChild(script);

    // Handle script load event
    script.onload = () => {
      const evt = document.createEvent("Event");
      evt.initEvent("DOMContentLoaded", false, false);
      window.dispatchEvent(evt);
    };

    // Cleanup function
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} id="supportByBMC"></div>;
}
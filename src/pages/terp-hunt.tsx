import React, { useEffect, useRef, useState } from "react";

const TerpHuntPage = () => {
  const [iframeHeight, setIframeHeight] = useState("3000px"); // initial height
  const loadCounter = useRef(0); // counter to track iframe loads
  const [isMobile, setIsMobile] = useState(false);

  // Listener for window resize
  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 705;
      setIsMobile(currentIsMobile);
      if (currentIsMobile) {
        setIframeHeight("5000px"); // adjust for mobile
      } else {
        setIframeHeight("3000px");
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleIframeLoad = () => {
    loadCounter.current += 1; // increment counter
    if (loadCounter.current % 2 == 0 && loadCounter.current > 1) {
      // Rescale the iframe and scroll the window to an appropriate point
      // Adjust these values as needed
      if (isMobile) {
        setIframeHeight("1000px"); // adjust for mobile
        window.scrollTo(0, 200); // adjust for mobile
      } else {
        setIframeHeight("500px");
        window.scrollTo(0, 315);
      }
    } else if (loadCounter.current % 2 == 1) {
      if (isMobile) {
        setIframeHeight("5000px"); // adjust for mobile
      } else {
        setIframeHeight("3000px");
      }
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="mx-4 flex min-h-screen flex-col items-center justify-center py-6 md:py-16">
      <main className="mx-4 w-full max-w-2xl rounded-md bg-white p-6 shadow-md">
        <div className="google-survey py-6" style={{ width: "90%" }}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSflUAPGOLqu3n8uynqUMOnUjHcQdHxuY7TylV-KTxWpudvnjQ/viewform?embedded=true"
            width="100%"
            height={iframeHeight}
            onLoad={handleIframeLoad}
            style={{ border: "none" }}
          >
            Loading…
          </iframe>
        </div>
      </main>
    </div>
  );
};

export default TerpHuntPage;

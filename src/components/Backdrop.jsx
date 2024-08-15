import { useEffect, useRef, useState } from "react";

const DEFAULT_SRC = "/assets/image_placeholder.svg";

const Backdrop = ({
  backgroundColor = "#0f172a",
  className,
  src,
  maxImageWidth,
  maxImageHeight,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    image.onload = () => {
      setIsLoaded(true);
    };
    image.onerror = () => {
      setIsLoaded(true);
      setIsError(true);
    };
    image.src = src;
    return () => {
      image.onload = null;
      image.error = null;
    };
  }, [src]);

  return (
    <div
      className={`absolute inset-0 flex justify-center ${isLoaded ? "" : "blur-lg"} transition-all duration-200`}
      style={{ backgroundColor: backgroundColor }}
    >
      <img
        ref={imageRef}
        src={DEFAULT_SRC}
        className={`h-full w-full object-cover object-top ${className} ${isLoaded && !isError ? "opacity-100" : "opacity-0"} transition-all duration-200`}
        style={{ maxWidth: maxImageWidth, maxHeight: maxImageHeight }}
        {...props}
      />
    </div>
  );
};
export default Backdrop;

// #0f172a

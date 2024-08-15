import { useEffect, useRef, useState } from "react";

const DEFAULT_SRC = "/assets/image_placeholder.svg";

const ImageComponent = ({
  className,
  src,
  fallback_src = DEFAULT_SRC,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const image = imgRef.current;
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
      image.onerror = null;
    };
  }, [src]);

  return (
    <div
      className={`h-full w-full bg-cover bg-center bg-no-repeat ${className} ${isLoaded ? "" : "blur-sm"} transition-all duration-200`}
      style={{ backgroundImage: `url('${fallback_src}')` }}
    >
      <img
        ref={imgRef}
        src={fallback_src}
        crossOrigin="anonymous"
        className={`h-full w-full object-cover object-center ${className} ${isLoaded && !isError ? "opacity-100" : "opacity-0"} transition-all duration-200`}
        {...props}
      />
    </div>
  );
};

export default ImageComponent;

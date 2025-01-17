import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

const Container: React.FC<ContainerProps> = ({
  ref,
  children,
  className,
  id,
}) => {
  return (
    <div
      ref={ref}
      id={id}
      className={`max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;

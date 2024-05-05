"use client";

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div
            className="
        max-w-[1400px]
        md:px-6
        sm:px-2
        px-4
      "
        >
            {children}
        </div>
    );
};

export default Container;

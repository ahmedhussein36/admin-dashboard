'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  data? : string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Available Data !",
  subtitle = `Looks like No Data has been added ` ,
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div 
      className="
        flex 
        flex-col m-4 p-4 h-[200px]
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Back to Home"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;
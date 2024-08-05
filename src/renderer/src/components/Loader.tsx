import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loader;

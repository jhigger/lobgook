import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Error = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">404</h3>
        <p className="text-sm text-muted-foreground">
          This page could not be found.
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Error;

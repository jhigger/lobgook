const Error = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">404</h3>
        <p className="text-sm text-muted-foreground">
          This page could not be found.
        </p>
      </div>
    </div>
  );
};

export default Error;
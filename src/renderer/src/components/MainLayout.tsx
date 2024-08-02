import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className="rounded-lg bg-background p-8 shadow">{children}</div>;
};

export default MainLayout;

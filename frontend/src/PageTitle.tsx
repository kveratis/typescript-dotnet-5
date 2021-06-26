import React from 'react';

interface Props {
  children: React.ReactNode;
}

const PageTitle = ({ children }: Props) => <h2>{children}</h2>;

export default PageTitle;

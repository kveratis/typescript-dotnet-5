import React from 'react';
import PageTitle from './PageTitle';

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Page = ({ title, children }: Props) => (
  <div>
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </div>
);

export default Page;

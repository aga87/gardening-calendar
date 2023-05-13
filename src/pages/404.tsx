import React, { ReactElement } from 'react';
import ErrorPage from 'next/error';
import { Layout } from '@/layout';

const Custom404Page = () => {
  return <ErrorPage statusCode={404} />;
};

Custom404Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Custom404Page;

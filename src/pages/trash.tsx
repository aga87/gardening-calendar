import React, { ReactElement } from 'react';
import { Layout } from '@/layout';

const TrashPage = () => {
  return <h1>Trash</h1>;
};

TrashPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TrashPage;

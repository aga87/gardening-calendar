import React, { ReactElement } from 'react';
import { Layout } from '@/layout';

const NewPlantPage = () => {
  return <h1>New Plant</h1>;
};

NewPlantPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewPlantPage;

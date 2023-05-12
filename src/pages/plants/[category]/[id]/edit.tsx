import React, { ReactElement } from 'react';
import { Layout } from '@/layout';

const EditPlantDetailPage = () => {
  return <h1>Edit</h1>;
};

EditPlantDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditPlantDetailPage;

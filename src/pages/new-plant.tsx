import React, { ReactElement } from 'react';
import { Layout } from '@/layout';
import { NewPlant } from '@/features/plants';

const NewPlantPage = () => {
  return <NewPlant />;
};

NewPlantPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewPlantPage;

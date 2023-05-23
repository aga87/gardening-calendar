import React, { ReactElement } from 'react';
import { Layout } from '@/layout';
import { PlantsInTrash } from '@/features/plants';

const TrashPage = () => {
  return <PlantsInTrash />;
};

TrashPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TrashPage;

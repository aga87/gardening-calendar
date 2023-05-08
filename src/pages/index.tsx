import React, { ReactElement } from 'react';
import { Plants } from '@/features';
import { Layout } from '@/layout';

const PlantsPage = () => {
  return <Plants category='all' />;
};

PlantsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlantsPage;

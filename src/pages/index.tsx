import React, { ReactElement } from 'react';
import { Plants } from '@/features';
import { Layout } from '@/layout';

const PlantsPage = () => {
  return <Plants category='plants' />;
};

PlantsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlantsPage;

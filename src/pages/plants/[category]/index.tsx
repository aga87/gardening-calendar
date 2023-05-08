import React, { ReactElement } from 'react';
import { Plants } from '@/features';
import { useRouter } from 'next/router';
import { Layout } from '@/layout';
import type { PlantCategory } from '@/features/plants/types';

const PlantCategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return <Plants category={category as PlantCategory} />;
};

PlantCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlantCategoryPage;

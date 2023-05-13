import React, { ReactElement } from 'react';
import ErrorPage from 'next/error';
import { Plants } from '@/features/plants';
import { useRouter } from 'next/router';
import { Layout } from '@/layout';
import { PlantCategory, isPlantCategory } from '@/features/plants/types';

const PlantCategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  if (isPlantCategory(category))
    return <Plants category={category as PlantCategory} />;
  return <ErrorPage statusCode={404} />;
};

PlantCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlantCategoryPage;

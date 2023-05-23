import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { PlantDetail } from '@/features/plants';
import { Layout } from '@/layout';

const PlantDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === 'string') return <PlantDetail plantId={id} />;
  return <ErrorPage statusCode={400} />;
};

PlantDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlantDetailPage;

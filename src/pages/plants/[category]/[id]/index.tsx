import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { PlantDetail } from '@/features/plants';
import { Layout } from '@/layout';

const PlantDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <PlantDetail plantId={id as string} />;
};

PlantDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlantDetailPage;

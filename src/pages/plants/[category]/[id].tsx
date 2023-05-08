import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/layout';

const PlantDetailPage = () => {
  const router = useRouter();
  const { category, id } = router.query;

  return (
    <h1>
      Plant detail: {category} - {id}
    </h1>
  );
};

PlantDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlantDetailPage;

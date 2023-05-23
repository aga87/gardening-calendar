import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { EditPlantDetail } from '@/features/plants';
import { Layout } from '@/layout';

const EditPlantDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === 'string') return <EditPlantDetail plantId={id} />;
  return <ErrorPage statusCode={400} />;
};

EditPlantDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditPlantDetailPage;

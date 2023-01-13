import dynamic from 'next/dynamic';
import { Layout } from '../components/layout/WebsiteLayout';

const Home = () => {
  return (
    <Layout title="Home Page">
      <div className="page-content">Home page</div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });

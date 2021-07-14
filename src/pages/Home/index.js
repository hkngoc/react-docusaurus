import Layout from 'theme-classic/Layout';

import Header from './Header';
import Features from './Features';

const Home = () => {
  return (
    <Layout>
      <Header />
      <main>
        <Features />
      </main>
    </Layout>
  );
};

export default Home;

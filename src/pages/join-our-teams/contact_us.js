import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';


export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
      <Layout
        title={`Contact Us`}
        description="Contact the Idaho Esports Association">
        <main>
        <h1>Contact Us</h1>
        <p>For general inquiries, please email <a href="mailto:info@idahoesports.gg">info@idahoesports.gg</a></p>
        <p>Join our mailing list!</p>
        <div class="ml-embedded" data-form="ryvj7J"></div>
        </main>
      </Layout>
    );
  }
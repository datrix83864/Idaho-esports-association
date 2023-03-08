import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';


export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
      <Layout
        title={`Overwatch 2 Standings`}
        description="Idaho Esports Associaion Overwatch 2 Sandings">
        <main>
        <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQLoZLQ3ku7u0mOpW-2QwDx3HqGu3tLH8jT02Gd_XsofpVgUmDKKucjp3-IOWn05JaT6vFLUIDe36UA/pubhtml?widget=false&amp;headers=false&amp;gid=494534924&amp;chrome=false&amp;range=A1:D21" height="600" width="450"></iframe>
        </main>
      </Layout>
    );
  }
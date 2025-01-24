import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import SignupForm from "../../components/SignupForm";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <head>
        <html className="some-extra-html-class" />
        <body className="other-extra-body-class" />
        <title>Head Metadata customized title!</title>
        <meta charSet="utf-8" />
        <meta name="twitter:card" content="summary" />
        <link
          rel="canonical"
          href="https://docusaurus.io/docs/markdown-features/head-metadata"
        />
      </head>
      <Layout
        title={`Contact Us`}
        description="Contact the Idaho Esports Association"
      >
        <main>
          <h1>Contact Us</h1>
          <p>
            For general inquiries, please email{" "}
            <a href="mailto:info@idahoesports.gg">info@idahoesports.gg</a>
          </p>
          <SignupForm />
        </main>
      </Layout>
    </>
  );
}

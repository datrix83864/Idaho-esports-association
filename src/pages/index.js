import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        
        <div className={styles.buttons}>
        <Link
            className="button button--secondary button--lg"
            to="/docs/category/rules">
            Rules
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="The place for all things Idaho Esports!">
      <HomepageHeader />
      <main>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1545 2000">
          <image width="1545" height="2000" xlink:href="/path/to/image"></image> <a xlink:href="https://youtube.com/live/7EmjJNinpG8?feature=share">
            <rect x="373" y="1289" fill="#fff" opacity="0" width="315" height="385"></rect>
          </a><a xlink:href="https://www.twitch.tv/idaho_esports">
            <rect x="859" y="1290" fill="#fff" opacity="0" width="328" height="382"></rect>
          </a><a xlink:href="https://www.idahoesports.gg">
            <rect x="552" y="1786" fill="#fff" opacity="0" width="448" height="100"></rect>
          </a>
        </svg>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080">
          <image width="1920" height="1080" xlinkHref={require('@site/static/img/HS_Game_Days.png').default}></image> <a xlinkHref="https://www.idahoesports.gg/schedule/smash_bros">
            <rect x="0" y="419" fill="#fff" opacity="0" width="402" height="307"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/valorant">
            <rect x="407" y="421" fill="#fff" opacity="0" width="366" height="306"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/rocket_league">
            <rect x="778" y="422" fill="#fff" opacity="0" width="396" height="305"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/overwatch_2">
            <rect x="1180" y="421" fill="#fff" opacity="0" width="371" height="305"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/apex">
            <rect x="777" y="731" fill="#fff" opacity="0" width="398" height="348"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/fortnite">
            <rect x="0" y="734" fill="#fff" opacity="0" width="402" height="346"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/league_of_legends">
            <rect x="1557" y="730" fill="#fff" opacity="0" width="363" height="348"></rect>
          </a>
        </svg>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080">
          <image width="1920" height="1080" xlinkHref={require('@site/static/img/MS Game Days.png').default}></image> <a xlinkHref="https://www.idahoesports.gg/schedule/smash_bros">
            <rect x="407" y="421" fill="#fff" opacity="0" width="366" height="306"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/rocket_league">
            <rect x="778" y="422" fill="#fff" opacity="0" width="396" height="305"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/mario_kart_8">
            <rect x="1180" y="421" fill="#fff" opacity="0" width="371" height="305"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/apex">
            <rect x="777" y="731" fill="#fff" opacity="0" width="398" height="348"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/fortnite">
            <rect x="0" y="734" fill="#fff" opacity="0" width="402" height="346"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/valorant">
            <rect x="1557" y="421" fill="#fff" opacity="0" width="363" height="304"></rect>
          </a><a xlinkHref="https://www.idahoesports.gg/schedule/league_of_legends">
            <rect x="1557" y="730" fill="#fff" opacity="0" width="363" height="348"></rect>
          </a>
        </svg>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

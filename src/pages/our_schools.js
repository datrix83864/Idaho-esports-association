import prisma from '../lib/prisma';
import { useState } from 'react';
import React from 'react';
import Layout from '@theme/Layout';

export default function OurSchools() {
  return (
    <Layout title="Our Schools" description="Our Schools">
  
        <main>
          <p className="description">
            Schools currently affiliated with us!
          </p>
          
      </main>
    </Layout>
  );
}

'use client';

import Image from 'next/image';

import { PublicSiteShell } from '@/components/public-site-shell';

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>公司簡介</h1>
        <section style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <Image
            src="/legacy/logo.jpg"
            alt="公司標誌"
            width={120}
            height={120}
            style={{ borderRadius: '12px' }}
          />
          <p style={{ fontSize: '16px', lineHeight: '1.6', flex: 1 }}>
            本公司專注於物業管理軟體開發，透過先進技術提升管理效率與用戶體驗，致力成為台北地區領先的營運平台供應商。
          </p>
        </section>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <Image src="/legacy/icon-speed.svg" alt="高效" width={60} height={60} />
            <h3>高效</h3>
            <p>優化流程，提升工作效率，節省時間成本。</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Image src="/legacy/icon-security.svg" alt="安全" width={60} height={60} />
            <h3>安全</h3>
            <p>採用多層防護，保障用戶資料安全。</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Image src="/legacy/icon-support.svg" alt="支援" width={60} height={60} />
            <h3>支援</h3>
            <p>全天候技術支援，快速解決問題。</p>
          </div>
        </section>
      </div>
    </PublicSiteShell>
  );
}

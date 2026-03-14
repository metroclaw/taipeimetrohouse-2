'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { PublicSiteShell } from '@/components/public-site-shell';
import { useAuth } from '@/components/auth-provider';
import { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } from '@/lib/auth-config';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState(SUPER_ADMIN_EMAIL);
  const [password, setPassword] = useState(SUPER_ADMIN_PASSWORD);
  const [error, setError] = useState('');
  const [nextPath, setNextPath] = useState('/dashboard');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(params.get('next') || '/dashboard');
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = login(email, password);

    if (!result.ok) {
      setError(result.message ?? '登入失敗');
      return;
    }

    router.push(nextPath);
  }

  return (
    <PublicSiteShell>
      <section className="auth-layout">
        <div className="auth-copy">
          <p className="eyebrow">登入</p>
          <h1>進入內部管理區</h1>
          <p className="hero-copy">
            公司簡介、房型介紹這些公開內容不需要登入；房源、工單、租約等管理功能則改成登入後可看。
          </p>
          <div className="callout">
            <h2>最高權限示範帳號</h2>
            <p>{SUPER_ADMIN_EMAIL}</p>
            <p>密碼：{SUPER_ADMIN_PASSWORD}</p>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
          </label>
          <label className="form-field">
            <span>密碼</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button className="primary-button" type="submit">
            登入
          </button>
          <p className="form-hint">
            還沒有帳號？
            <Link href="/register"> 先建立帳號</Link>
          </p>
        </form>
      </section>
    </PublicSiteShell>
  );
}

'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { PublicSiteShell } from '@/components/public-site-shell';
import { useAuth } from '@/components/auth-provider';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = login(email, password);
    if (!result.ok) {
      setError(result.message ?? '登入失敗，請再試一次。');
      return;
    }

    setError('');
    router.push(next);
  }

  return (
    <PublicSiteShell>
      <section className="auth-layout">
        <div className="auth-copy">
          <p className="eyebrow">登入</p>
          <h1>先用前端帳號模型把流程跑順</h1>
          <p className="hero-copy">
            目前登入流程先用 localStorage 模擬，等畫面與權限切分確認穩定後，再接正式 Firebase
            Auth。
          </p>
          <div className="callout">
            <h2>示範帳號</h2>
            <p>最高權限與一般帳號可以在 `auth-config.ts` 裡調整，方便測試不同角色畫面。</p>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="form-field">
            <span>密碼</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button className="primary-button" type="submit">
            登入
          </button>
          <p className="form-hint">
            還沒有帳號？
            <Link href="/register"> 前往建立帳號</Link>
          </p>
        </form>
      </section>
    </PublicSiteShell>
  );
}

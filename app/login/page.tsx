'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { PublicSiteShell } from '@/components/public-site-shell';
import { useAuth } from '@/components/auth-provider';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/dashboard';
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = login(email, password);

    if (!result.ok) {
      setError(result.message ?? '登入失敗');
      return;
    }

    setError('');
    router.push(nextPath);
  }

  return (
    <PublicSiteShell>
      <section className="auth-layout">
        <div className="auth-copy">
          <p className="eyebrow">Login</p>
          <h1>先登入，再切換到 README 裡的內部頁</h1>
          <p className="hero-copy">
            這裡會連到 /dashboard、/properties、/tasks、/leases 與 /settings。沒有帳號可以先去註冊頁，用 mock
            帳密體驗各模組的串接流程。
          </p>
          <div className="callout">
            <h2>測試用帳號</h2>
            <p>最高權限：metroclaw168@gmail.com / metrohouse168</p>
            <p>一般帳號：自行在註冊頁建立，即可登入查看內部頁。</p>
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
            <Link href="/register"> 建立帳號</Link>
          </p>
        </form>
      </section>
    </PublicSiteShell>
  );
}

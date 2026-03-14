'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { PublicSiteShell } from '@/components/public-site-shell';
import { useAuth } from '@/components/auth-provider';
import { SUPER_ADMIN_EMAIL } from '@/lib/auth-config';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name || !email || !password) {
      setError('欄位請填完整。');
      return;
    }

    if (password !== confirmPassword) {
      setError('兩次輸入的密碼不一致。');
      return;
    }

    const result = register({ name, email, password });

    if (!result.ok) {
      setError(result.message ?? '建立帳號失敗');
      return;
    }

    router.push('/dashboard');
  }

  return (
    <PublicSiteShell>
      <section className="auth-layout">
        <div className="auth-copy">
          <p className="eyebrow">建立帳號</p>
          <h1>先把登入入口做出來</h1>
          <p className="hero-copy">
            這一版先用前端 mock 帳號流程驗證畫面與角色切分；未來接正式資料層時，
            `metroclaw168@gmail.com` 仍會保留成可調整的最高權限設定。
          </p>
          <div className="callout">
            <h2>角色規則</h2>
            <p>一般新帳號會是 staff。</p>
            <p>{SUPER_ADMIN_EMAIL} 會自動被視為最高權限。</p>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>姓名</span>
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" />
          </label>
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
          <label className="form-field">
            <span>確認密碼</span>
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button className="primary-button" type="submit">
            建立帳號
          </button>
          <p className="form-hint">
            已經有帳號？
            <Link href="/login"> 前往登入</Link>
          </p>
        </form>
      </section>
    </PublicSiteShell>
  );
}

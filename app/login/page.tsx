'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

import { useAuth } from '@/components/auth-provider';
import styles from './page.module.css';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
  </svg>
);

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/tasks';
  const { login } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);

  function handleGoogleLogin() {
    setIsLoading(true);
    
    // Simulate loading waiting for 1.5s
    setTimeout(() => {
      // Auto-login test account
      login('metroclaw168@gmail.com', 'metrohouse168');
      router.push(nextPath);
    }, 1500);
  }

  return (
    <>
      <div className={styles.bgPrimary}>
        <div className={styles.card}>
          <div className={styles.imageCol}></div>
          <div className={styles.contentCol}>
            <h1 className={styles.title}>歡迎來到大都會物業管理系統!</h1>
            <hr className={styles.hr} />
            <button
              className={styles.btnPrimary}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <GoogleIcon /> Login with Google
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.modalOverlay} ${isLoading ? styles.show : ''}`}>
        <div className={styles.modalDialog}>
          <div className={styles.modalHeader}>
            <h5 className={styles.modalTitle}>您已登入...請稍候</h5>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.spinnerGrow}></div>
            <div className={styles.spinnerGrow}></div>
            <div className={styles.spinnerGrow}></div>
            <div className={styles.spinnerGrow}></div>
            <div className={styles.spinnerGrow}></div>
            <div className={styles.spinnerGrow}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

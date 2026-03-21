'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { ProtectedPage } from '@/components/protected-page';
import { STORAGE_USERS_KEY, defaultUsers } from '@/lib/auth-config';
import type { StoredUser } from '@/types/auth';
import styles from './settings.module.css';

const AddressCardIcon = () => (
  <svg className={styles.iconWhite50} width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
    <path d="M192 208c0-17.67-14.33-32-32-32s-32 14.33-32 32 14.33 32 32 32 32-14.33 32-32zm32-80v32c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16v-32c0-8.84-7.16-16-16-16H240c-8.84 0-16 7.16-16 16zm0 160v32c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16v-32c0-8.84-7.16-16-16-16H240c-8.84 0-16 7.16-16 16zm0 160v32c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16v-32c0-8.84-7.16-16-16-16H240c-8.84 0-16 7.16-16 16zm-64-80c-53.02 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96zm0-128c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm0 176c-48.48 0-89.66 28.27-109.91 69.34C40.66 492.34 32 501.99 32 512v16h256v-16c0-10.01-8.66-19.66-18.09-26.66C249.66 444.27 208.48 416 160 416z" />
  </svg>
);

export default function SettingsPage() {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    // We only access localStorage in the browser (client-side) to populate members
    const raw = window.localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) {
      try {
        setUsers(JSON.parse(raw) as StoredUser[]);
      } catch (err) {
        setUsers(defaultUsers);
      }
    } else {
      setUsers(defaultUsers);
    }
  }, []);

  const handleSendInvite = () => {
    if (!inviteEmail) return;
    alert(`資料修改成功！已寄送邀請至：${inviteEmail} (Simulated)`);
    setIsInviteOpen(false);
    setInviteEmail('');
  };

  return (
    <ProtectedPage allowRoles={['superadmin']}>
      <AppShell>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>帳戶管理</h1>
          <button className={styles.btnWarning} onClick={() => setIsInviteOpen(true)}>
            <AddressCardIcon /> 新增工作人員
          </button>
        </div>

        {/* DataTales Example */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h6 className={styles.cardTitle}>人員表</h6>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.tableResponsive}>
              <table className={styles.table} width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>姓名</th>
                    <th>信箱</th>
                    <th>權限</th>
                    <th>房源</th>
                    <th>房間</th>
                    <th>修改</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.role === 'superadmin' && '最高管理員'}
                        {user.role === 'maintenance' && '修繕人員'}
                        {user.role === 'cleaner' && '清潔人員'}
                        {user.role === 'staff' && '一般行政'}
                        {user.role === 'tenant' && '房客'}
                      </td>
                      <td>全部</td>
                      <td>全部</td>
                      <td>
                        <button className={styles.btnAction} onClick={() => alert('修改尚未實作 (Mocked)')}>
                          編輯
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center' }}>No records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AppShell>

      {/* Invite Modal */}
      <div className={`${styles.modalOverlay} ${isInviteOpen ? styles.show : ''}`}>
        <div className={styles.modalDialog}>
          <div className={styles.modalHeader}>
            <h5 className={styles.modalTitle}>新增人員</h5>
            <button className={styles.closeBtn} onClick={() => setIsInviteOpen(false)}>
              ×
            </button>
          </div>
          <div className={styles.modalBody}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <label htmlFor="email_data" style={{ display: 'block', marginBottom: '0.5rem' }}>
                邀請人員信箱
              </label>
              <input
                id="email_data"
                type="email"
                className={styles.formControl}
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.btnSecondary} onClick={() => setIsInviteOpen(false)}>
              取消
            </button>
            <button className={styles.btnPrimary} onClick={handleSendInvite}>
              寄送邀請
            </button>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}

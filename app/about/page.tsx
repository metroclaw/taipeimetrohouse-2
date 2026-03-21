'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.bodyOverride}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>大都會物業</Link>
        <div className={styles.navMenu}>
          <Link href="/">首頁</Link>
          <Link href="/login">管理系統</Link>
        </div>
      </header>

      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay}></div>
        <video 
          className={styles.bannerVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          src="/legacy/taipei101.mp4"
        ></video>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>大都會物業</h1>
          <p className={styles.bannerText}>
            美好的寓所，美好的遇見。<br />
            流轉於新城市的車水馬龍，感受新城市的黑夜與白天，商旅途中，享受家的舒適。<br />
            大都會美寓，蘊含了活力與溫暖，匯聚了情感與記憶，讓你在這裡，遇見台北愛上台灣<br />
            大都會物業管理顧問公司秉持以人為本，體貼用心的精神，將設計的靈魂注入居家環境，為您量身訂做專屬的家。
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className={styles.wrapper}>
        <div className={styles.inner}>
          <header className={styles.specialHeader}>
            <h2>服務項目</h2>
            <p>我們提供最完善的服務，包含台北市、新北市物業管理、住宿清潔管理服務、代尋物件、設計規劃施工、建築法規諮詢、房地產諮詢、稅務規劃、銀行融資、搬家服務。</p>
          </header>
          
          <div className={styles.highlights}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><i className="fa fa-vcard-o"></i></div>
              <h3 className={styles.highlightTitle}>物業管理</h3>
              <p className={styles.highlightText}>詳細介紹</p>
            </div>
            
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><i className="fa fa-magic"></i></div>
              <h3 className={styles.highlightTitle}>清潔管理</h3>
              <p className={styles.highlightText}>詳細介紹</p>
            </div>
            
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><i className="fa fa-crop"></i></div>
              <h3 className={styles.highlightTitle}>設計規劃施工</h3>
              <p className={styles.highlightText}>詳細介紹</p>
            </div>
            
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><i className="fa fa-line-chart"></i></div>
              <h3 className={styles.highlightTitle}>房地產諮詢</h3>
              <p className={styles.highlightText}>詳細介紹</p>
            </div>
            
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><i className="fa fa-paper-plane-o"></i></div>
              <h3 className={styles.highlightTitle}>稅務規劃</h3>
              <p className={styles.highlightText}>詳細介紹</p>
            </div>
            
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><i className="fa fa-qrcode"></i></div>
              <h3 className={styles.highlightTitle}>銀行融資</h3>
              <p className={styles.highlightText}>詳細介紹</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.wrapperCta}>
        <div className={styles.inner}>
          <header className={styles.specialHeader} style={{ marginBottom: 0 }}>
            <h2>競爭優勢</h2>
            <p style={{ margin: '1.5rem auto 0', color: '#ffffff' }}>
              積極打造智慧家居，結合數位電表、語音聲控、雲端運算等方式，提供客戶全方位的服務，並跟上時代的潮流。
            </p>
          </header>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.wrapper}>
        <div className={styles.inner}>
          <header className={styles.specialHeader}>
            <h2>團隊成員</h2>
            <p>以人為本 體貼用心</p>
          </header>
          
          <div className={styles.testimonials}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialQuote}>執行長</p>
              <div className={styles.testimonialAuthor}>
                <Image src="/legacy/pic03.jpg" alt="田穎 CEO" width={100} height={100} className={styles.testimonialImage} />
                <p className={styles.testimonialCredit}>
                  <strong>田穎</strong>
                  <span>CEO</span>
                </p>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialQuote}>會計</p>
              <div className={styles.testimonialAuthor}>
                <Image src="/legacy/pic03.jpg" alt="Accounting" width={100} height={100} className={styles.testimonialImage} />
                <p className={styles.testimonialCredit}>
                  <strong>姓名</strong>
                  <span>Accounting</span>
                </p>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialQuote}>主管</p>
              <div className={styles.testimonialAuthor}>
                <Image src="/legacy/pic03.jpg" alt="Manager" width={100} height={100} className={styles.testimonialImage} />
                <p className={styles.testimonialCredit}>
                  <strong>姓名</strong>
                  <span>Manager</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>核心理念</h3>
              <p>美好的寓所，美好的遇見。 流轉於新城市的車水馬龍，感受新城市的黑夜與白天，商旅途中，享受家的舒適。<br />大都會美寓，蘊含了活力與溫暖，匯聚了情感與記憶，讓你在這裡，遇見台北 愛上台灣 大都會物業管理顧問公司 秉持著以人為本，體貼用心的精神，將設計的靈魂注入居家環境，為您量身訂做專屬的家。<br />我們提供最完善的服務，包含台北市、新北市物業管理、住宿清潔管理服務、代尋物件、設計規劃施工、建築法規諮詢、房地產諮詢、稅務規劃、銀行融資、搬家服務。 如有興趣，請與我們聯繫</p>
            </div>
            
            <div className={styles.footerSection}>
              <h4>服務項目</h4>
              <ul className={styles.footerList}>
                <li><Link href="#">裝潢修繕</Link></li>
                <li><Link href="#">物業管理</Link></li>
                <li><Link href="#">法規諮詢</Link></li>
                <li><Link href="#">投資顧問</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4>聯絡方式</h4>
              <ul className={`${styles.footerList} ${styles.footerIconList}`}>
                <li><i className="fa fa-envelope"></i> <a href="mailto:metrohousetaipei@gmail.com">Email</a></li>
                <li><i className="fa fa-facebook"></i> <a href="https://www.facebook.com/metrohousetaipei">Facebook</a></li>
                {/* FontAwesome 4.7 link does not easily map to line except with an image, but target has fab fa-line. 
                    Target link had <i class="icon fab fa-line"> Which is FontAwesome 5. But I can just use fa-commenting or similar, or just fa fa-wechat. */}
                <li><i className="fa fa-commenting"></i> <a href="http://line.me/ti/p/ALDRj84u4N#~">Line</a></li>
              </ul>
            </div>
          </div>
          
          <div className={styles.copyright}>
            © Metrohousetaipei. <a href="https://pigoo833.github.io/">Pigoo833</a>,
          </div>
        </div>
      </footer>
    </div>
  );
}


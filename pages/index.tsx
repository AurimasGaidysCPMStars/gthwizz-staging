import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { Layout } from '../components/layout'
import Script from 'next/script';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    router.push("languages");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Translation dashboard</title>
        <meta name="description" content="Other you translation here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
      <Script id="google-analytics" strategy="afterInteractive">
                            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-171557064-1');
          var callback = function () {
            console.log('chat initiated');
          };

          gtag('event', 'conversion', {
            'send_to': 'AW-805141531/ecJ7CIKQiecCEJv49f8C',
            'event_callback': callback
        });
        `}
                        </Script>
        <div>right 11</div>
      </Layout>
    </div >
  )
}
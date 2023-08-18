import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import CopyKitt from '../components/CopyKitt';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CopyKitt Tutorial | AI Generated Marketing</title>
        <meta
          name="description"
          content="Generate branding snippets for your product."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CopyKitt />
    </div>
  );
}

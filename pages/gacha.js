import Head from 'next/head';
import Gacha from '../components/Gacha';
import Link from 'next/link';

export default function GachaPage() {
  return (
    <div>
      <Head>
        <title>ガチャシミュレーター</title>
        <meta name="description" content="ガチャシミュレーター画面" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: 'center', marginTop: '50px' }}>
        <Gacha />
        <Link href="/">
          <button>ホームに戻る</button>
        </Link>
      </main>
    </div>
  );
}


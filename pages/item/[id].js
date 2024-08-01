import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ItemDetail() {
  const router = useRouter();
  const { id } = router.query;

  // アイテムの詳細情報を取得する処理を追加

  return (
    <div>
      <Head>
        <title>アイテム詳細</title>
        <meta name="description" content="アイテムの詳細情報" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>アイテム詳細: {id}</h1>
        {/* アイテムの詳細情報をここに表示 */}
        <Link href="/">
          <button>ホームに戻る</button>
        </Link>
      </main>
    </div>
  );
}


import Head from 'next/head';
import Todo from '../components/Todo';
import Link from 'next/link';

export default function TodoPage() {
  return (
    <div>
      <Head>
        <title>TODOリスト</title>
        <meta name="description" content="TODOリスト画面" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: 'center', marginTop: '50px' }}>
        <Todo />
        <Link href="/">
          <button>ホームに戻る</button>
        </Link>
      </main>
    </div>
  );
}


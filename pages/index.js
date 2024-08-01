// pages/index.js
import Head from 'next/head';
import Todo from '../components/Todo';

export default function Home() {
  return (
    <div>
      <Head>
        <title>TODOアプリ</title>
        <meta name="description" content="Next.jsで作成したTODOアプリ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Todo />
      </main>
    </div>
  );
}


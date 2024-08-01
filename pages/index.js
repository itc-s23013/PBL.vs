// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import Todo from '../components/Todo';

export default function Home() {
  const [showTodo, setShowTodo] = useState(false);

  return (
    <div>
      <Head>
        <title>TODOアプリ</title>
        <meta name="description" content="Next.jsで作成したTODOアプリ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: 'center', marginTop: '50px' }}>
        {showTodo ? (
          <Todo />
        ) : (
          <div>
            <h1>TODOアプリへようこそ</h1>
            <button onClick={() => setShowTodo(true)}>開始</button>
          </div>
        )}
      </main>
    </div>
  );
}


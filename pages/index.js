import Head from 'next/head';
import { useState, useEffect } from 'react';
import Todo from '../components/Todo';

export default function Home() {
  const [showTodo, setShowTodo] = useState(false);

  // ローカルストレージからshowTodoの状態を読み込む
  useEffect(() => {
    const savedShowTodo = JSON.parse(localStorage.getItem('showTodo'));
    if (savedShowTodo !== null) {
      setShowTodo(savedShowTodo);
    }
  }, []);

  // showTodoの状態が変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('showTodo', JSON.stringify(showTodo));
  }, [showTodo]);

  return (
    <div>
      <Head>
        <title>TODOアプリ</title>
        <meta name="description" content="Next.jsで作成したTODOアプリ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: 'center', marginTop: '50px' }}>
        {showTodo ? (
          <div>
            <Todo />
            <button onClick={() => setShowTodo(false)}>戻る</button>
          </div>
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


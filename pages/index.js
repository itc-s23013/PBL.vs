import Head from 'next/head';
import { useState, useEffect } from 'react';
import Todo from '../components/Todo';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [showTodo, setShowTodo] = useState(false);
  const [showGacha, setShowGacha] = useState(false);

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
        <title>アプリホーム</title>
        <meta name="description" content="アプリのホーム画面" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: 'center', marginTop: '50px' }}>
        {showTodo ? (
          <div>
            <Link href="/todo">
              <button>TODOリスト</button>
            </Link>
            <Link href="/gacha">
              <button>ガチャシミュレーター</button>
            </Link>
            <button onClick={() => setShowTodo(false)}>ホームに戻る</button>
          </div>
        ) : showGacha ? (
          <div>
            <Link href="/gacha">
              <button>ガチャシミュレーター</button>
            </Link>
            <button onClick={() => setShowGacha(false)}>ホームに戻る</button>
          </div>
        ) : (
          <div>
            <h1>アプリへようこそ</h1>
            <Link href="/todo">
              <button>TODOアプリを開始</button>
            </Link>
            <Link href="/gacha">
              <button>ガチャシミュレーターを開始</button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}


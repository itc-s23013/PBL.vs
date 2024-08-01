import Head from 'next/head';
import { useState, useEffect } from 'react';
import Todo from '../components/Todo';
import Gacha from '../components/Gacha';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  const [showTodo, setShowTodo] = useState(false);
  const [showGacha, setShowGacha] = useState(false);

  // 状態を初期化する
  useEffect(() => {
    setShowTodo(false);
    setShowGacha(false);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>アプリ選択</title>
        <meta name="description" content="アプリ選択画面" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {showTodo ? (
          <Todo />
        ) : showGacha ? (
          <Gacha />
        ) : (
          <div>
            <h1 className={styles.header}>アプリ選択画面</h1>
            <Link href="/todo">
              <button>TODOアプリを開始</button>
            </Link>
            <br />
            <Link href="/gacha">
              <button>ガチャシミュレーターを開始</button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}


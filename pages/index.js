import Head from 'next/head';
import { useState, useEffect } from 'react';
import Todo from '../components/Todo';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [showTodo, setShowTodo] = useState(false);

  useEffect(() => {
    const savedShowTodo = JSON.parse(localStorage.getItem('showTodo'));
    if (savedShowTodo !== null) {
      setShowTodo(savedShowTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showTodo', JSON.stringify(showTodo));
  }, [showTodo]);

  return (
    <div className={styles.container}>
      <Head>
        <title>TODOアプリ</title>
        <meta name="description" content="Next.jsで作成したTODOアプリ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {showTodo ? (
          <div>
            <Todo />
            <button className={styles.button} onClick={() => setShowTodo(false)}>戻る</button>
          </div>
        ) : (
          <div>
            <h1 className={styles.header}>TODOアプリへようこそ</h1>
            <button className={styles.button} onClick={() => setShowTodo(true)}>開始</button>
          </div>
        )}
      </main>
    </div>
  );
}


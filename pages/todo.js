import Todo from '../components/Todo';
import Link from 'next/link';

export default function TodoPage() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>TODOアプリ</h1>
      <Todo />
      <br />
      <Link href="/">
        ホームに戻る
      </Link>
    </div>
  );
}


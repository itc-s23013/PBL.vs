import Gacha from '../components/Gacha';
import Link from 'next/link';

export default function GachaPage() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>ガチャシミュレーター</h1>
      <Gacha />
      <br />
      <Link href="/">
        ホームに戻る
      </Link>
    </div>
  );
}


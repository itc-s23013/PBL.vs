import { useRouter } from 'next/router';
import Link from 'next/link';

const items = [
  { id: 1, name: 'アイテムA', rarity: '★', description: 'これはアイテムAの説明です。' },
  { id: 2, name: 'アイテムB', rarity: '★★', description: 'これはアイテムBの説明です。' },
  { id: 3, name: 'アイテムC', rarity: '★★★', description: 'これはアイテムCの説明です。' },
  { id: 4, name: 'アイテムD', rarity: '★★★★', description: 'これはアイテムDの説明です。' },
  { id: 5, name: 'アイテムE', rarity: '★★★★★', description: 'これはアイテムEの説明です。' },
];

export default function ItemDetail() {
  const router = useRouter();
  const { id } = router.query;
  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return <p>アイテムが見つかりません</p>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{item.name} {item.rarity}</h1>
      <p>{item.description}</p>
      <br />
      <Link href="/">
        ホームに戻る
      </Link>
    </div>
  );
}


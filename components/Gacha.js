import { useState } from 'react';
import Link from 'next/link';

const items = [
  { id: 1, name: 'アイテムA', rarity: '★', probability: 0.5 },
  { id: 2, name: 'アイテムB', rarity: '★★', probability: 0.3 },
  { id: 3, name: 'アイテムC', rarity: '★★★', probability: 0.15 },
  { id: 4, name: 'アイテムD', rarity: '★★★★', probability: 0.04 },
  { id: 5, name: 'アイテムE', rarity: '★★★★★', probability: 0.01 },
];

const getRandomItem = () => {
  const random = Math.random();
  let accumulatedProbability = 0;
  for (const item of items) {
    accumulatedProbability += item.probability;
    if (random < accumulatedProbability) {
      return item;
    }
  }
  return items[items.length - 1];
};

const Gacha = () => {
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  const rollGacha = (count) => {
    const newResults = [];
    for (let i = 0; i < count; i++) {
      const selectedItem = getRandomItem();
      newResults.push(selectedItem);
      setHistory((prevHistory) => [selectedItem, ...prevHistory]);
    }
    setResults(newResults);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>ガチャシミュレーター</h1>
      <button onClick={() => rollGacha(1)} style={{ padding: '10px 20px', fontSize: '16px' }}>ガチャを1回引く</button>
      <button onClick={() => rollGacha(10)} style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}>ガチャを10回引く</button>
      <div style={{ marginTop: '20px' }}>
        <h2>結果</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {results.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <Link href={`/item/${item.id}`}>
                {item.name} {item.rarity}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>履歴</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {history.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              {item.name} {item.rarity}
            </li>
          ))}
        </ul>
      </div>
      <br />
      <Link href="/">
        ホームに戻る
      </Link>
    </div>
  );
};

export default Gacha;


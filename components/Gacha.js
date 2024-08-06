import { useState } from 'react';
import styles from '../styles/Gacha.module.css';

const Gacha = () => {
  const items = [
    { name: 'SSRアイテム1', rarity: 'SSR', id: 1 },
    { name: 'SSRアイテム2', rarity: 'SSR', id: 2 },
    { name: 'SRアイテム1', rarity: 'SR', id: 3 },
    { name: 'SRアイテム2', rarity: 'SR', id: 4 },
    { name: 'Rアイテム1', rarity: 'R', id: 5 },
    { name: 'Rアイテム2', rarity: 'R', id: 6 },
  ];

  const rarityChances = {
    SSR: 0.05,
    SR: 0.15,
    R: 0.8,
  };

  const [history, setHistory] = useState([]);
  const [collection, setCollection] = useState(() => {
    const savedCollection = JSON.parse(localStorage.getItem('collection'));
    return savedCollection || [];
  });

  const getRandomItem = () => {
    const rand = Math.random();
    let rarity = 'R';
    if (rand < rarityChances.SSR) rarity = 'SSR';
    else if (rand < rarityChances.SSR + rarityChances.SR) rarity = 'SR';

    const filteredItems = items.filter(item => item.rarity === rarity);
    const randomIndex = Math.floor(Math.random() * filteredItems.length);
    return filteredItems[randomIndex];
  };

  const pullGacha = () => {
    const item = getRandomItem();
    setHistory((prevHistory) => [item, ...prevHistory]);
    setCollection((prevCollection) => {
      if (!prevCollection.find((i) => i.id === item.id)) {
        const newCollection = [...prevCollection, item];
        localStorage.setItem('collection', JSON.stringify(newCollection));
        return newCollection;
      }
      return prevCollection;
    });
  };

  const pull10Gacha = () => {
    const newItems = [];
    for (let i = 0; i < 10; i++) {
      const item = getRandomItem();
      newItems.push(item);
      setCollection((prevCollection) => {
        if (!prevCollection.find((i) => i.id === item.id)) {
          const newCollection = [...prevCollection, item];
          localStorage.setItem('collection', JSON.stringify(newCollection));
          return newCollection;
        }
        return prevCollection;
      });
    }
    setHistory((prevHistory) => [...newItems, ...prevHistory]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ガチャシミュレーター</h1>
      <div className={styles.buttonContainer}>
        <button onClick={pullGacha} className={styles.button}>ガチャを引く</button>
        <button onClick={pull10Gacha} className={styles.button}>10連ガチャを引く</button>
      </div>
      <h2 className={styles.subtitle}>ガチャ履歴</h2>
      <ul className={styles.history}>
        {history.map((item, index) => (
          <li key={index} className={`${styles.item} ${styles[item.rarity.toLowerCase()]}`}>
            {item.name} ({item.rarity})
          </li>
        ))}
      </ul>
      <h2 className={styles.subtitle}>コレクション</h2>
      <ul className={styles.collection}>
        {collection.map((item, index) => (
          <li key={index} className={`${styles.item} ${styles[item.rarity.toLowerCase()]}`}>
            {item.name} ({item.rarity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gacha;


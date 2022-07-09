import Head from 'next/head';
import { useState } from 'react';
import { CalendarHistory } from '../components/CalendarHistory/index';
import styles from './styles/Home.module.css';

export default function Home() {
  const [calendarsPerformances, setCalendarsPerformances] = useState([
    { date: new Date(2022, 4, 1), status: 'good' },
    { date: new Date(2022, 4, 2), status: 'good' },
    { date: new Date(2022, 4, 3), status: 'good' },
    { date: new Date(2022, 4, 29), status: 'bad' },
    { date: new Date(2022, 4, 31), status: 'bad' },
    { date: new Date(2022, 5, 1), status: 'bad' },
    { date: new Date(2022, 5, 2), status: 'bad' },
    { date: new Date(2022, 5, 3), status: 'bad' },
    { date: new Date(2022, 5, 4), status: 'bad' },
    { date: new Date(2022, 5, 5), status: 'bad' },
    { date: new Date(2022, 5, 7), status: 'regular' },
    { date: new Date(2022, 5, 8), status: 'regular' },
    { date: new Date(2022, 5, 9), status: 'regular' },
  ]);

  let datesGood = [];
  let datesRegular = [];
  let datesBad = [];

  // divide desempenho dos calendarios em bom, regular e ruim
  calendarsPerformances.map((value) => {
    switch (value.status) {
      case 'good':
        datesGood = datesGood.concat(value.date);
        break;
      case 'regular':
        datesRegular = datesRegular.concat(value.date);
        break;
      case 'bad':
        datesBad = datesBad.concat(value.date);
        break;
      default:
        break;
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Calendar History</title>
      </Head>

      <h1>Calendar History</h1>
      <p>Check your performance in the last days</p>

      <CalendarHistory
        datesGood={datesGood}
        datesRegular={datesRegular}
        datesBad={datesBad}
      />
    </div>
  );
}

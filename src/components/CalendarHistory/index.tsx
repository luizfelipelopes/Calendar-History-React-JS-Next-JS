import { Calendar } from '@natscale/react-calendar';
import {
  MonthIndices,
  WeekdayIndices,
} from '@natscale/react-calendar/dist/utils/types';
import { useCallback, useEffect, useState } from 'react';
import '@natscale/react-calendar/dist/main.css';

// https://github.com/natscale/react-calendar

interface CalendarHistoryProps {
  datesRegular: Array<Date>;
  datesBad: Array<Date>;
  datesGood: Array<Date>;
}

export function CalendarHistory({
  datesRegular,
  datesBad,
  datesGood,
}: CalendarHistoryProps) {
  let valueInitial: Array<Date>;
  let arrayCalendars: Array<Date[]> = [];
  let arrayDisabled: Array<Date> = [];
  let arrayHighlight: Array<Date> = [];

  valueInitial = datesBad.concat(datesGood);
  valueInitial = datesRegular
    .concat(valueInitial)
    .filter((value, index, self) => self.indexOf(value) === index);

  const value = valueInitial;
  const [regular, setRegular] = useState<Array<Date>>([]);
  const [bad, setBad] = useState<Array<Date>>([]);

  let dataFutura: boolean = false;
  let valueDateRedirect: string;

  // Responsavel por setar o moniitoramento e redirecionamento das
  // quando as datas são não-selecionadas e não são futuras
  useEffect(() => {
    const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
      const classNameBody = e.target.parentElement?.className;
      const classNameItem =
        e.target.parentElement?.parentElement?.parentElement?.className;

      if (
        classNameBody?.includes('rc_body-cell_value') &&
        !classNameItem?.includes('rc_selected') &&
        !classNameItem?.includes('rc_body-row') &&
        !classNameItem?.includes('rc_body-cell_value') &&
        !dataFutura
      ) {
        window.location.replace(`/?date=${valueDateRedirect}`);
      }
    };

    window.removeEventListener('click', onClick as any);
    window.addEventListener('click', onClick as any);
  }, []);

  // Responsável por monitorar a atualização das datas
  useEffect(() => {
    setBad(datesBad);
    setRegular(datesRegular);
  }, [datesGood, datesBad, datesRegular]);

  const weekDaysLabel: Record<WeekdayIndices, string> = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S',
  ];
  const monthsLabel: Record<MonthIndices, string> = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  value.map((date) => {
    if (!Array.isArray(arrayCalendars[date.getMonth()])) {
      arrayCalendars[date.getMonth()] = [];
    }
    arrayCalendars[date.getMonth()].push(date);
  });

  arrayCalendars = arrayCalendars.filter((value) => value != null);

  // datas desabilitadas (serão datas de desempenho ruim)
  const badDatesCalendar = useCallback(
    (date) => {
      arrayDisabled = bad.filter((value) => value.getTime() === date.getTime());

      if (arrayDisabled.length > 0) {
        return true;
      }
    },
    [bad]
  );

  // datas destacadas (serão datas de desempenho regular)
  const regularDatesCalendar = useCallback(
    (date) => {
      arrayHighlight = regular.filter(
        (value) => value.getTime() === date.getTime()
      );

      if (arrayHighlight.length > 0) {
        return true;
      }
    },
    [regular]
  );

  // Recupera o click da data no calendário
  const clickDayCalendar = useCallback((valueDate: Array<Date>) => {
    const [lastDate] = valueDate.slice(-1);
    const futureDate = lastDate?.getTime() > new Date().getTime();

    if (futureDate) {
      dataFutura = true;
      return;
    }

    dataFutura = false;
    valueDateRedirect = `${lastDate?.getDate()}-${
      lastDate?.getMonth() + 1
    }-${lastDate?.getFullYear()}`;
  }, []);

  const positiveQuestion: string = 'GOOD';
  const regularQuestion: string = 'REGULAR';
  const negativeQuestion: string = 'BAD';

  return (
    <div className={'historyCalendar'}>
      <div className={'containerCalendars'}>
        {arrayCalendars.map((dates, index) => (
          <Calendar
            key={index}
            className={'myCalendar'}
            isMultiSelector
            hideAdjacentDates
            lockView
            startOfWeek={0}
            weekDaysLabel={weekDaysLabel}
            monthsLabel={monthsLabel}
            isDisabled={badDatesCalendar}
            isHighlight={regularDatesCalendar}
            value={dates}
            onChange={clickDayCalendar}
          />
        ))}
      </div>
      <div className="lengend-performance">
        <div className="legend-item">
          <span className="green"></span> {positiveQuestion}{' '}
        </div>
        <div className="legend-item">
          <span className="orange"></span> {regularQuestion}{' '}
        </div>
        <div className="legend-item">
          <span className="red"></span> {negativeQuestion}{' '}
        </div>
      </div>
    </div>
  );
}


import React, { MouseEvent } from 'react'
import classnames from 'classnames'

export type MonthsProps = {
  selected: number | null;
  max?: number | undefined;
  min?: number | undefined;
  monthClick: (month: number) => void;
}

export default function Months ({ selected, max, min, monthClick }: MonthsProps) {
  if (min === undefined) {
    min = 0
  }
  if (max === undefined) {
    max = 11
  }
  return (
    <tbody>
      <tr>
        <Month month={0} selected={selected} disabled={min > 0 || max < 0} onClick={monthClick} />
        <Month month={1} selected={selected} disabled={min > 1 || max < 1} onClick={monthClick} />
        <Month month={2} selected={selected} disabled={min > 2 || max < 2} onClick={monthClick} />
      </tr>
      <tr>
        <Month month={3} selected={selected} disabled={min > 3 || max < 3} onClick={monthClick} />
        <Month month={4} selected={selected} disabled={min > 4 || max < 4} onClick={monthClick} />
        <Month month={5} selected={selected} disabled={min > 5 || max < 5} onClick={monthClick} />
      </tr>
      <tr>
        <Month month={6} selected={selected} disabled={min > 6 || max < 6} onClick={monthClick} />
        <Month month={7} selected={selected} disabled={min > 7 || max < 7} onClick={monthClick} />
        <Month month={8} selected={selected} disabled={min > 8 || max < 8} onClick={monthClick} />
      </tr>
      <tr>
        <Month month={9} selected={selected} disabled={min > 9 || max < 9} onClick={monthClick} />
        <Month month={10} selected={selected} disabled={min > 10 || max < 10} onClick={monthClick} />
        <Month month={11} selected={selected} disabled={min > 11 || max < 11} onClick={monthClick} />
      </tr>
    </tbody>
  )
}

export type MonthProps = {
  month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  disabled: boolean;
  selected: number | null;
  onClick: (month: number) => void;
}

function Month ({ month, disabled, selected, onClick }: MonthProps) {
  var classes = classnames({
    selected: selected === month,
    disabled,
  })

  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick(month)
  }

  return (
    <td className={classes}>
      <a
        href="#"
        title={months[month][1]}
        onClick={disabled ? noop : clickHandler}>{months[month][0]}</a>
    </td>
  )
}

type MonthLabels = readonly [string, string]
const months: readonly [MonthLabels, MonthLabels, MonthLabels, MonthLabels, MonthLabels, MonthLabels, MonthLabels, MonthLabels, MonthLabels, MonthLabels, MonthLabels, MonthLabels] = [
  ['Jan', 'Janeiro'],
  ['Fev', 'Fevereiro'],
  ['Mar', 'Março'],
  ['Abr', 'Abril'],
  ['Mai', 'Maio'],
  ['Jun', 'Junho'],
  ['Jul', 'Julho'],
  ['Ago', 'Agosto'],
  ['Set', 'Setembro'],
  ['Out', 'Outubro'],
  ['Nov', 'Novembro'],
  ['Dez', 'Dezembro'],
]

function noop (): void {}

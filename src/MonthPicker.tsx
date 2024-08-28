
import './MonthPicker.css'
import React, { KeyboardEvent, MouseEvent, useState } from 'react'
import Header from './Header'
import Months from './Months'

export type YearMonth = {
  year: number;
  month: number;
}

type MonthPickerProps = {
  isClearable?: boolean;
  name?: string;
  className?: string;
  value: YearMonth | null;
  currentYear?: number;
  currentMonth?: number;
  min?: YearMonth;
  max?: YearMonth;
  onChange: (value: YearMonth | null) => void;
}

const defaultCurrentYear = (new Date()).getFullYear()
const defaultMin = { year: 1970, month: 0 }
const defaultMax = { year: 2037, month: 11 }

export default function MonthPicker(props: MonthPickerProps) {
  const { value, name, className = '', isClearable = false, onChange, min = defaultMin, max = defaultMax, currentYear = defaultCurrentYear } = props
  const [open, setOpen] = useState(false)
  const [year, setYear] = useState(2021)

  const showCalendar = (): void  => {
    setOpen(true)
  }

  const hideCalendar = (): void  => {
    setOpen(false)
  }

  const clearInput = (): void => {
    onChange(null)
  }

  const goToCurrentYear = (): void => {
    setYear(currentYear)
  }

  const goToNextYear = (): void => {
    setYear((prevYear: number): number => {
      if (max && prevYear >= max.year) return prevYear
      return prevYear + 1
    })
  }

  const goToPrevYear = (): void => {
    setYear((prevYear: number): number => {
      if (min && prevYear <= min.year) return prevYear
      return prevYear - 1
    })
  }

  const monthClick = (month: number): void => {
    hideCalendar()
    onChange({ month, year })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      hideCalendar()
      if (isClearable) {
        clearInput()
      }
    }
  }

  const onClearInputClick = (_: MouseEvent) => {
    hideCalendar()
    clearInput()
  }

  return (
    <div className="monthpicker_container">
      <input
        type="hidden"
        name={name}
        value={value ? value.year + '-' + (value.month + 1) : ''} />
      <input
        type="text"
        readOnly
        value={value ? (value.month + 1) + '/' + value.year : ''}
        onClick={showCalendar}
        onFocus={showCalendar}
        onBlur={hideCalendar}
        onKeyDown={handleKeyDown}
        className={className + ' monthpicker_input'} />
      { isClearable && value ? <i className="glyphicon glyphicon-remove-circle monthpicker_clear_icon" onClick={onClearInputClick}></i> : null }
      <div
        className="monthpicker"
        style={{ display: open ? 'block' : 'none' }}
        onMouseDown={preventDefault}>
        <table>
          <Header
            year={year}
            goToCurrentYear={goToCurrentYear}
            goToPrevYear={goToPrevYear}
            goToNextYear={goToNextYear} />
          <Months
            min={min && year === min.year ? min.month : undefined}
            max={max && year === max.year ? max.month : undefined}
            selected={value ? value.month : null}
            monthClick={monthClick}/>
        </table>
      </div>
    </div>
  )
}

function preventDefault (event: MouseEvent) {
  event.preventDefault()
}

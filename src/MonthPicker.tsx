
import './MonthPicker.css'
import React, { Component, KeyboardEvent, MouseEvent } from 'react'
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

type MonthPickerState = {
  open: boolean;
  year: number;
}

export default class MonthPicker extends Component<MonthPickerProps, MonthPickerState> {

  constructor (props: MonthPickerProps) {
    super(props)
    this.state = {
      open: false,
      year: 2021,
    }
    this.goToPrevYear = this.goToPrevYear.bind(this)
    this.goToNextYear = this.goToNextYear.bind(this)
    this.goToCurrentYear = this.goToCurrentYear.bind(this)
    this.showCalendar = this.showCalendar.bind(this)
    this.hideCalendar = this.hideCalendar.bind(this)
  }

  static getDerivedStateFromProps (props: MonthPickerProps, state: MonthPickerState) {
    if (state.open) {
      return null
    }
    if (!props.value) {
      return { year: 2021 }
    }

    let year = props.value.year
    year = Math.min(year, props.max ? props.max.year : 2037)
    year = Math.max(year, props.min ? props.min.year : 1970)
    return { year }
  }

  showCalendar (): void {
    this.setState({ open: true })
  }

  hideCalendar (): void {
    this.setState({ open: false })
  }

  clearInput () {
    this.props.onChange && this.props.onChange(null)
  }

  goToCurrentYear () {
    this.setState({
      // year: this.props.currentYear,
    })
  }

  goToNextYear () {
    this.setState((state: Readonly<MonthPickerState>): Pick<MonthPickerState, 'year'> | null => {
      if (this.props.max && state.year >= this.props.max.year) return null
      return {
        year: state.year + 1,
      }
    })
  }

  goToPrevYear () {
    this.setState((state: Readonly<MonthPickerState>): Pick<MonthPickerState, 'year'> | null => {
      if (this.props.min && state.year <= this.props.min.year) return null
      return {
        year: state.year - 1,
      }
    })
  }

  monthClick = (month: number): void => {
    const { year } = this.state
    this.hideCalendar()
    this.props.onChange({ month, year })
  }

  // getChildContext () {
  //   return { currentMonth: this.props.currentMonth }
  // }

  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.hideCalendar()
      if (this.props.isClearable) {
        this.clearInput()
      }
    }
  }

  onClearInputClick = (_: MouseEvent) => {
    this.hideCalendar()
    this.clearInput()
  }

  override render () {
    const { name, className, value, max, min } = this.props
    const { year, open } = this.state
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
          onClick={this.showCalendar}
          onFocus={this.showCalendar}
          onBlur={this.hideCalendar}
          onKeyDown={this.handleKeyDown}
          className={className + ' monthpicker_input'} />
        { this.props.isClearable && this.props.value ? <i className="glyphicon glyphicon-remove-circle monthpicker_clear_icon" onClick={this.onClearInputClick}></i> : null }
        <div
          className="monthpicker"
          style={{ display: open ? 'block' : 'none' }}
          onMouseDown={preventDefault}>
          <table>
            <Header
              year={year}
              goToCurrentYear={this.goToCurrentYear}
              goToPrevYear={this.goToPrevYear}
              goToNextYear={this.goToNextYear} />
            <Months
              min={min && year === min.year ? min.month : undefined}
              max={max && year === max.year ? max.month : undefined}
              selected={value ? value.month : null}
              monthClick={this.monthClick}/>
          </table>
        </div>
      </div>
    )
  }
}

const currentYear = (new Date()).getFullYear()
const currentMonth = (new Date()).getMonth()
const minMonth = { year: 1970, month: 0 }
const maxMonth = { year: 1970, month: 0 }

// MonthPicker.defaultProps = MonthPickerControlled.defaultProps = {
//   isClearable: false,
//   min: minMonth,
//   max: maxMonth,
//   currentYear,
//   currentMonth,
// }

// MonthPickerControlled.childContextTypes = {
//   currentMonth: PropTypes.number,
// }

function preventDefault (event: MouseEvent) {
  event.preventDefault()
}

export function parseYearMonth (value: string, min: YearMonth = minMonth, max: YearMonth = maxMonth) {
  var split, year, month
  value = String(value)
  if (value.indexOf('.') !== -1) {
    split = value.split('.')
  } else if (value.indexOf('-') !== -1) {
    split = value.split('-')
  } else {
    return {
      year: currentYear,
      month: currentMonth,
    }
  }

  if (split[0] === undefined || split[1] === undefined) {
    throw new Error('Invalid month');
  }

  year = parseInt(split[0], 10)
  month = parseInt(split[1], 10)

  // O mes na url é de 1-12, mas internamente é de 0-11.
  month -= 1

  year = Math.min(year, max.year)
  year = Math.max(year, min.year)

  month = Math.min(month, max.month, 11)
  month = Math.max(month, min.month, 0)

  return { year, month }
}

export function lastYearMonth (): YearMonth {
  const now = new Date()
  return {
    year: now.getFullYear() - (now.getMonth() === 0 ? 1 : 0),
    month: now.getMonth() === 0 ? 11 : (now.getMonth() - 1),
  }
}

export function anoMesToUrl (anomes: YearMonth): string {
  // O mes na url é de 1-12, mas internamente é de 0-11.
  return `${anomes.year}-${anomes.month + 1}`
}

export function anoMesToDate (anomes: YearMonth): Date {
  return new Date(`${anomes.year}-${anomes.month + 1}-1 00:00:00.000`)
}

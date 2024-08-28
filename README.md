# Monthpicker

A month picker input

## Demo

Check out the demo [here](https://jonnsl.github.io/monthpicker/)

## Installation

```bash
npm install --save @jonnsl/monthpicker
```

## Examples

```javascript
import React, { useState } from "react";
import MonthPicker from "@jonnsl/monthpicker";

export default function App() {
  const [value, setValue] = useState(null)
  return (
    <MonthPicker value={value} onChange={setValue}/>
  )
}

export default BRLInput;
```


## Props

| Props | Type | Default | Description |
| - | - | - | - |
| name | string | undefined | Specifies the name of the <input> element |
| className | string | undefined | CSS class for the input element |
| value | YearMonth | null | undefined | Currently selected value |
| currentYear | number | (the current year) | Year to be considered the current year |
| currentMonth | number | (the current month) | Month to be considered the current month |
| min | YearMonth | { year: 1970, month: 0 } | Minimun selectable month |
| max | YearMonth | { year: 2037, month: 11 } | Maximun selectable month |
| onChange | (value: YearMonth | null) => void | undefined | This events fires when the user selects a month |

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

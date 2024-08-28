
import React, { MouseEvent } from 'react'

export type HeaderProps = {
  year: number;
  goToPrevYear: (e: MouseEvent<HTMLTableCellElement>) => void;
  goToNextYear: (e: MouseEvent<HTMLTableCellElement>) => void;
  goToCurrentYear: (e: MouseEvent<HTMLTableCellElement>) => void;
}

export default function Header ({ year, goToPrevYear, goToNextYear, goToCurrentYear }: HeaderProps) {
  return (
    <thead>
      <tr>
        <th className="prev" title="Previous Year" onClick={goToPrevYear}>
          <div className="monthpicker_arrow">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAElBMVEVMaXEzMzMzMzMzMzMzMzMzMzOqNZLUAAAABXRSTlMA8DBAIKtxmksAAABpSURBVHja7ZYpDgAxEMM61/+/vDCsqsZwE25LYT6e97quasJnzEQyXoYdL8OOl2HHy7DkZegdrxXkpyAfDfk0b/43fEP+FOO5gF84aYMNNjwYmhoKBwZOHBpZNPNoaNLUpbGNc9/zLvsAFDYMzXbLUuEAAAAASUVORK5CYII=" alt="Previous Year"></img>
          </div>
        </th>
        <th onClick={goToCurrentYear}>{ year }</th>
        <th className="next" title="Next Year" onClick={goToNextYear}>
          <div className="monthpicker_arrow">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAElBMVEVMaXEzMzMzMzMzMzMzMzMzMzOqNZLUAAAABXRSTlMA8DBAIKtxmksAAABqSURBVHja7ZYxCsBADMN6sfP/L/cgQ7dyVGPtXYJM0ZVlb7NkwtfqXsX4MQB+DIAfw1eeGLx5ZFA3M6ihwYsaKoYYYjgwmBqEBfgEyFf48L/hDXn+3sV4njg8snjm8dB8UpfGNs79LDvcDQt6DM1+Vuw5AAAAAElFTkSuQmCC" alt="Next Year"></img>
          </div>
        </th>
      </tr>
    </thead>
  )
}



import React from 'react'
import './TableStyles.css'

const TableCell = ({content, header, onHeaderClick}) => {

    const cell = header ? (
        <th onClick={() => onHeaderClick(content)} scope="col" className="cell cell-header">
            {content}
        </th>
    ) : (
        <td className="cell">
            {content}
        </td>
    )

    return (cell)
}

export default TableCell
import React from 'react'
import { useExpanded, useSortBy, useTable } from 'react-table'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const Table = ({ columns, data, renderRowSubComponent }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
    } = useTable({ columns, data },
        useSortBy,
        useExpanded,
    )

    return (
        <>
            <table {...getTableProps()} className='w-full text-left'>
                <thead className='bg-bgLight border'>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className='p-2'>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <TiArrowSortedDown className='ml-1 inline'/>
                                                : <TiArrowSortedUp className='ml-1 inline' />
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            // Use a React.Fragment here so the table markup is still valid
                            <React.Fragment key={i}>
                                <tr className='border border-collapse'>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()} className='p-2'>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>

                                {row.isExpanded ? (
                                    <tr className='border border-collapse'>
                                        <td colSpan={visibleColumns.length}>
                                            {renderRowSubComponent({ row })}
                                        </td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Table
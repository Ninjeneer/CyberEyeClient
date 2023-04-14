import React from 'react'
import { Row, useExpanded, useSortBy, useTable } from 'react-table'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import cx from 'classnames'






const TableHeader = ({ headerGroups, style }) => {
    return (
        <thead className='bg-bgLight border'>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps([
                { className: style?.headerStyle }
            ])}>
                {headerGroup.headers.map((column: any) => (
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
    )
}


type Props = {
    columns: any[]
    data: any[]
    renderRowSubComponent?: Function

    style?: {
        headerStyle?: string
    }
}
const Table = ({ columns, data, renderRowSubComponent, style }: Props) => {
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
                <TableHeader headerGroups={headerGroups} style={style} />
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: Row & { isExpanded: boolean }, i) => {
                        const originalData = row.original as any

                        prepareRow(row)
                        return (
                            // Use a React.Fragment here so the table markup is still valid
                            <React.Fragment key={i}>
                                <tr 
                                    className={cx(
                                        'border border-collapse', 
                                        originalData.onClick ? 'hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer duration-300' : null
                                    )} 
                                    onClick={originalData.onClick ? originalData.onClick : null}
                                >
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
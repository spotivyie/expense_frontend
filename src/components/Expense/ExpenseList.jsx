import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { formatDateToPtBr } from '../../utils/helper'

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Todas as despesas</h5>

                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={formatDateToPtBr(expense.date)}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList

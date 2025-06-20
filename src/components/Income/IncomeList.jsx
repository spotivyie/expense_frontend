import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionsInfoCard from '../Cards/TransactionInfoCard'
import { formatDateToPtBr } from '../../utils/helper'

const IncomeList = ({transactions, onDelete, onDownload}) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Fontes de renda</h5>

                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base'/> Download
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.map((income) => (
                    <TransactionsInfoCard
                        key={income._id}
                        title={income.source}
                        icon={income.icon}
                        date={formatDateToPtBr(income.date)}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList

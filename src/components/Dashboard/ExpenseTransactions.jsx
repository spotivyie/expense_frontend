import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { formatDateToPtBr } from '../../utils/helper'

const ExpenseTransactions = ({transactions, onSeeMore}) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Despesas</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    Ver Tudo <LuArrowRight className='text-base'/>
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0,5)?.map((expense)=>(
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={formatDateToPtBr(expense.date)}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseTransactions

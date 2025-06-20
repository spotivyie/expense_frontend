import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { formatDateToPtBr } from '../../utils/helper'

function RecentIncome({transactions, onSeeMore}) {
    console.log("transactions", transactions);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Rendas</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    Ver Tudo <LuArrowRight className='text-base'/>
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0,5)?.map((item) => (
                    
                    <TransactionInfoCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={formatDateToPtBr(item.date)}
                        amount={item.amount}
                        type="income"
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentIncome

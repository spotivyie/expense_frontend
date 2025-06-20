import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarCharData } from '../../utils/helper'

const IncomeOverView = ({transactions, onAddIncome}) => {
    const [chartData, setCharData] = useState([])
    
    useEffect(() => {
        const result = prepareIncomeBarCharData(transactions)
        setCharData(result)

        return() => {}
    }, [transactions])

    return (
        <div className="card">
            <div className="block space-y-6 sm:space-y-0 sm:flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Visão geral de renda</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Acompanhe seus ganhos ao longo do tempo e analise suas tendências de renda
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg"/>
                    Adicionar Renda
                </button>
            </div>

            <div className="mt-10">
                <CustomBarChart data={chartData}/>
            </div>
        </div>
    )
}

export default IncomeOverView

import React from 'react'
import { LuTrendingUpDown } from 'react-icons/lu'
import expenseImg from '../../assets/images/expense.png'

const AuthLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
                <img src={expenseImg} alt="Expense" className="w-auto h-8" />
                {children}
            </div>

            <div className="hidden md:block w-[40vw] h-screen relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1706169582307-8ae586631e8a?q=80&w=1170&auto=format&fit=crop"
                    alt="Despesas"
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-purple-900 opacity-40" />
                <div className="absolute top-6 right-6 z-10">
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Acompanhe suas rendas e despesas"
                        value="430.000"
                        color="bg-purple-600"
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }) => (
    <div className="flex items-center gap-4 bg-white bg-opacity-90 p-5 rounded-xl shadow-xl border border-gray-200">
        <div className={`w-12 h-12 flex items-center justify-center text-2xl text-white ${color} rounded-full`}>
            {icon}
        </div>
        <div>
            <h6 className="text-xs text-gray-600 mb-1">{label}</h6>
            <span className="text-xl font-semibold">R${value}</span>
        </div>
    </div>
)

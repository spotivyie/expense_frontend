import React, { useEffect, useState } from 'react'

import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import Modal from '../../components/Modal'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'

import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

import toast from 'react-hot-toast'

const Expense = () => {
    useUserAuth()

    const [expenseData, setExpenseData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    })
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

    const fetchExpenseDetails = async() => {
        if(loading) return

        setLoading(true)

        try{
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
            )
            if(response.data){
                setExpenseData(response.data)
            }
        }catch(error){
            console.log("Algo deu errado. Tente novamente.", error)
        }finally{
            setLoading(false)
        }
    }

    const handleAddExpense = async(expense) => {
        const {category, amount, date, icon} = expense

        if(!category.trim()){
            toast.error("A categoria é obrigatória")
            return
        }

        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("O valor deve ser um número válido maior que 0")
            return
        }

        if(!date){
            toast.error("Date is required")
            return
        }

        try{
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
            })

            setOpenAddExpenseModal(false)
            toast.success("Despesa adicionada com sucesso")
            fetchExpenseDetails()
        } catch(error){
            console.error(
                "Erro ao adicionar despesa:",
                error.response?.data?.message || error.message
            )
        }
    }

    useEffect(() => {
        fetchExpenseDetails()

        return () => {}
    }, [])

    const deleteExpense = async(id) => {
        try{
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

            setOpenDeleteAlert({show:false, data:null})
            toast.success("Detalhe de despesa excluído com sucesso")
            fetchExpenseDetails()
        }catch(error){
            console.error(
                "Erro ao deletar despesa",
                error.response?.data?.message || error.message
            )
        }
    }

    const handleDownloadExpenseDetails = async() => {
        try{
            const response = await axiosInstance.get(
                API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
                {
                    responseType: "blob",
                }
            )

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", "expense_details.xlsx")
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch(error){
            console.error("Error downloading expense details", error)
            toast.error("Failed to download expense details. Please try again")
        }
    }

    return (
        <DashboardLayout activeMenu="Expense">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                        />
                    </div>

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({show: true, data: id})
                        }}
                        onDownload={handleDownloadExpenseDetails}
                    />
                </div>

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Adicionar Despesa"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense}/>
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({show:false, data:null})}
                    title="Excluir Despesa"
                >
                    <DeleteAlert
                        content="Tem certeza de que deseja excluir este detalhe de despesa?"
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Expense

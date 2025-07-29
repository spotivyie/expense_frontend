import React, { useState, useEffect } from 'react'

import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'

import { useUserAuth } from '../../hooks/useUserAuth'

import toast from 'react-hot-toast'

import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverView from '../../components/Income/IncomeOverView'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'

const Income = () => {
    useUserAuth()

    const [incomeData, setIncomeData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    })
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

    const fetchIncomeDetails = async() => {
        if(loading) return

        setLoading(true)

        try{
            const response = await axiosInstance.get(
                `${API_PATHS.INCOME.GET_ALL_INCOME}`
            )
            if(response.data){
                setIncomeData(response.data)
            }
        }catch(error){
            console.log("Algo deu errado. Tente novamente.", error)
        }finally{
            setLoading(false)
        }
    }

    const handleAddIncome = async(income) => {
        const {source, amount, date, icon} = income

        if(!source.trim()){
            toast.error("A fonte de renda é obrigatória")
            return
        }

        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("O valor deve ser um número válido maior que 0")
            return
        }

        if(!date){
            toast.error("A data é obrigatória")
            return
        }

        try{
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source,
                amount,
                date,
                icon,
            })

            setOpenAddIncomeModal(false)
            toast.success("Renda adicionada com sucesso")
            fetchIncomeDetails()
        } catch(error){
            console.error(
                "Erro ao adicionar renda:",
                error.response?.data?.message || error.message
            )
        }
    }

    const deleteIncome = async(id) => {
        try{
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

            setOpenDeleteAlert({show:false, data:null})
            toast.success("Detalhes de renda excluídos com sucesso")
            fetchIncomeDetails()
        }catch(error){
            console.error(
                "Erro ao deletar renda",
                error.response?.data?.message || error.message
            )
        }
    }

    const handleDownloadIncomeDetails = async() => {
        try{
            const response = await axiosInstance.get(
                API_PATHS.INCOME.DOWNLOAD_INCOME,
                {
                    responseType: "blob",
                }
            )

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", "income_details.xlsx")
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch(error){
            console.error("Error downloading income details", error)
            toast.error("Failed to download income details. Please try again")
        }
    }

    useEffect(() => {
        fetchIncomeDetails()
        return( ) => {

        }
    }, [])

    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <IncomeOverView
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>
                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({show: true, data: id})
                        }}
                        onDownload={handleDownloadIncomeDetails}
                    />
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Adicionar renda"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome}/>
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({show:false, data:null})}
                    title="Excluir renda"
                >
                    <DeleteAlert
                        content="Tem certeza de que deseja excluir este detalhe de renda?"
                        onDelete={() => deleteIncome(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Income

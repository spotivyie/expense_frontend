import moment from 'moment'

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const getInitials = (name) => {
    if(!name) return ""
    
    const words = name.split(" ")
    let initials = ""

    for(let i = 0; i < Math.min(words.length, 2); i++){
        initials += words[i][0]
    }

    return initials.toUpperCase()
}

export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return ""

    const [integerPart, fractionalPart] = num.toString().split(".")
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger
}

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }))
    
    return chartData
}

export const prepareIncomeBarCharData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
    const formatter = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' })
    const chartData = sortedData.map((item) => ({
        month: formatter.format(new Date(item?.date)),
        amount: item?.amount,
        source: item?.source,
    }))

    return chartData
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
    const formatter = new Intl.DateTimeFormat('pt-BR', { month: 'short' })
    const chartData = sortedData.map((item) => {
        const day = new Date(item?.date).getDate()
        return {
            month: `${day}º ${formatter.format(new Date(item?.date))}`,  
            amount: item?.amount,
            category: item?.category,
        }
    })

    return chartData
}

export const formatDateToPtBr = (date) => {
    if (!date) return '';

    const dt = new Date(date);
    // Ajusta para fuso horário local sem perder o dia
    const localDate = new Date(dt.getTime() + dt.getTimezoneOffset() * 60000);

    return localDate.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

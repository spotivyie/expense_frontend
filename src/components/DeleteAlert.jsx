import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
    return (
        <div className=''>
            <p className='text-sm'>{content}</p>

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={onDelete}
                >
                    Deletar
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert

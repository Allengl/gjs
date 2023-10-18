import React from 'react'
import ProjectFeeTable from './DataTable'
import ProjectFeeForm from './ProjectFeeForm'


const Froms = (props) => {
  return (
    <div className='mt-12'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <ProjectFeeTable />
        <ProjectFeeForm />
      </div>
    </div>
  )
}

export default Froms

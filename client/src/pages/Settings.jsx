import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Tags from './Tags'

const Settings = () => {
  return (
    <>
      <Header heading={"Settings"} />
      <main className='container'>
        <div className='row'>
            <div className='col-md-2'>
                <Sidebar/>
            </div>
            <div className='col-md-10 mt-5'>
                <div className='card'>
                    <div className='card-body'>
                        <h3 className='text-center'>Adjust Settings</h3>
                        <hr/>
                        <Tags/>
                    </div>
                </div>
            </div>
        </div>

      </main>
    </>
  )
}

export default Settings

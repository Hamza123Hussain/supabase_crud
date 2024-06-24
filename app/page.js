'use client'
import { supabase } from '../utils/SupaBase_Config'
import { useEffect, useState } from 'react'

export default function Home() {
  const [title, setTitle] = useState('')
  const [UserData, SetData] = useState([])
  const [Updatedata, setupdate] = useState('')
  const handleSubmit = async () => {
    if (!title) {
      console.error('Title is required')
      return
    }

    try {
      const { data, error } = await supabase
        .from('Posts')
        .insert([{ Title: title }])

      if (error) {
        console.error('Error inserting data:', error.message)
        alert('NO DATA SAVED')
      } else {
        console.log('Data inserted successfully:', data)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  const getdata = async () => {
    try {
      const { data, error } = await supabase.from('Posts').select('*')

      if (error) {
        console.error('Error inserting data:', error.message)
        alert('NO DATA SAVED')
      } else {
        SetData(data)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  const UpdateData = async (itemid) => {
    try {
      const { data, error } = await supabase
        .from('Posts')
        .update({ Title: Updatedata })
        .eq('id', itemid)

      if (error) {
        console.error('Error inserting data:', error.message)
        alert('NO DATA SAVED')
      } else {
        console.log('Data inserted successfully:', data)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }
  const DeleteData = async (itemid) => {
    try {
      const { data, error } = await supabase
        .from('Posts')
        .delete()
        .eq('id', itemid)

      if (error) {
        console.error('Error inserting data:', error.message)
        alert('NO DATA SAVED')
      } else {
        console.log('Data inserted successfully:', data)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  useEffect(() => {
    getdata()
  }, [getdata])

  return (
    <div className="flex p-4 flex-col items-center ">
      <main className="flex p-4 flex-col items-center ">
        <h1> Inserting In SupaBase</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <button onClick={handleSubmit}>Submit</button>
      </main>
      <main className="flex p-4 flex-col items-center ">
        <h1> Retriving Data From SupaBase</h1>
        <div className=" flex gap-5 ">
          {UserData.map((element) => {
            return (
              <div key={element?.id}>
                <h1>{element?.Title}</h1>
              </div>
            )
          })}
        </div>
      </main>
      <main className="flex p-4 flex-col items-center ">
        <h1> Updating Data SupaBase</h1>
        <div className=" flex gap-5 ">
          {UserData.map((element) => {
            return (
              <div key={element?.id}>
                <h1>{element?.Title}</h1>
                <input
                  value={Updatedata}
                  onChange={(e) => setupdate(e.target.value)}
                  type="text"
                />
                <button
                  onClick={() => UpdateData(element?.id)}
                  className=" bg-green-300 rounded-lg p-4"
                >
                  Update Data
                </button>
              </div>
            )
          })}
        </div>
      </main>
      <main className="flex p-4 flex-col items-center ">
        <h1> Deleting Data SupaBase</h1>
        <div className=" flex gap-5 ">
          {UserData.map((element) => {
            return (
              <div key={element?.id} className=" flex flex-col">
                <h1>{element?.Title}</h1>
                <button
                  onClick={() => DeleteData(element?.id)}
                  className=" bg-red-600 rounded-lg p-4"
                >
                  Delete Data
                </button>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

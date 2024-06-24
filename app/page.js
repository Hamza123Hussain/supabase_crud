'use client'
import { supabase } from '@/utils/SupaBase_Config'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [title, settitle] = useState(null)

  const Handle_Submit = async () => {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title: title }])
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type=" text"
        value={title}
        onChange={(e) => settitle(e.target.value)}
      />

      <button onClick={() => Handle_Submit()}>Submit</button>
    </main>
  )
}

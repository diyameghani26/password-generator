import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

const App = () => {

  const [password, setPassword] = useState("")
  const [length, setlength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false)
  const [savedPassword, setSavedpassword] = useState([])
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password)
    passwordRef.current.select();
  }

  const generatePassword = () => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (isNumberAllowed) str += "0123456789"
    if (isCharacterAllowed) str += "`@#$%^&*^"


    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length)
      let characterPicked = str.charAt(randomIndex)
      pass += characterPicked
    }

    setPassword(pass)
  }


  useEffect(() => {
    generatePassword()
  }, [length, isNumberAllowed, isCharacterAllowed])


  return (

    <div className='min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-blue-100 text-gray-800 px-4 py-10 flex items-center justify-center'>

      <div className='w-full max-w-2xl bg-white/70 backdrop-blur-lg border border-pink-200 rounded-3xl p-6 sm:p-8 shadow-xl'>

        <h1 className='text-3xl sm:text-5xl font-bold text-center'>
          Password Generator
        </h1>

        <p className='text-center text-gray-500 mt-3 text-sm sm:text-base'>
          Generate strong and secure passwords instantly ⚡
        </p>


        <div className='mt-8 flex flex-col sm:flex-row gap-3'>

          <input
            ref={passwordRef}
            type="text"
            placeholder='Password'
            readOnly={true}
            value={password}
            className='flex-1 bg-white border border-pink-200 rounded-2xl px-5 py-4 text-base sm:text-xl outline-none shadow-sm'
          />

          <button
            onClick={copyPasswordToClipboard}
            className='bg-pink-300 hover:bg-pink-400 active:scale-95 transition rounded-2xl px-6 py-4 font-semibold text-gray-800'
          >
            Copy
          </button>

        </div>


        <div className='mt-8'>

          <div className='flex items-center justify-between mb-3'>
            <span className='text-lg'>Password Length</span>
            <span className='bg-purple-200 px-4 py-1 rounded-full text-sm text-gray-700'>
              {length}
            </span>
          </div>

          <input
            className='w-full cursor-pointer'
            type='range'
            min={0}
            max={100}
            value={length}
            onChange={(e) => setlength(Number(e.target.value))}
          />

        </div>


        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4'>

          <label
            htmlFor='num'
            className='bg-pink-50 border border-pink-200 rounded-2xl p-4 flex items-center gap-3 cursor-pointer'
          >

            <input
              id='num'
              type='checkbox'
              checked={isNumberAllowed}
              onChange={(e) => setIsNumberAllowed(e.target.checked)}
              className='w-5 h-5'
            />

            <span className='text-lg'>Numbers Allowed</span>

          </label>


          <label
            htmlFor='char'
            className='bg-gray-200 border border-gray-300 rounded-2xl p-4 flex items-center gap-3 cursor-pointer'
          >

            <input
              id='char'
              type='checkbox'
              checked={isCharacterAllowed}
              onChange={(e) => setIsCharacterAllowed(e.target.checked)}
              className='w-5 h-5'
            />

            <span className='text-lg'>Characters Allowed</span>

          </label>

        </div>


        <div className='mt-8 flex flex-col sm:flex-row gap-4'>

          <button
            onClick={() => {
              setlength(8);
              setIsCharacterAllowed(false);
              setIsNumberAllowed(false)
            }}
            className='flex-1 bg-rose-300 hover:bg-rose-400 active:scale-95 transition rounded-2xl px-6 py-4 font-semibold text-gray-800 text-xl'
          >
            Reset Password
          </button>


          <button
            onClick={() => {
              setSavedpassword(prevPass => ([...prevPass, password]))
            }}
            className='flex-1 bg-purple-300 hover:bg-purple-400 active:scale-95 transition rounded-2xl px-6 py-4 font-semibold  text-gray-800 text-xl'
          >
            Save Password
          </button>

        </div>


        <div className='mt-10'>

          <h2 className='text-2xl font-semibold mb-4'>Saved Passwords</h2>

          <div className='max-h-60 overflow-y-auto space-y-3 pr-2'>

            {
              savedPassword.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='bg-white border border-pink-200 rounded-xl px-4 py-3 break'
                  >
                    {item}
                  </div>
                )
              })
            }

          </div>

        </div>

      </div>

    </div>
  )
}

export default App


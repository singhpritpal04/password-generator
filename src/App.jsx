import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {

  const pasref = useRef(null)

  const [length, setLength] = useState(4)
  const [password, setPassword] = useState('')
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  
  const generatePassword = useCallback(()=>{
    let pass =''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numberAllowed) str += '0123456789'
    if (characterAllowed) str += '!@#$%&*()_+'
    for (let i=0; i<=length;i++){
      const ch = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(ch)
    }
    setPassword(pass)
  },[length,characterAllowed,numberAllowed, setPassword])

  const copyPwToClipboard = useCallback(()=>{
    pasref.current?.select()
    pasref.current?.setSelectionRange(0,21)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    generatePassword()
  },[length,characterAllowed,numberAllowed,generatePassword])

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4 w-80">
    
        <input
          type="text"
          value={password}
          placeholder="Password"         
          className="border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          readOnly
          ref={pasref}
        />
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input 
            type="checkbox" className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            defaultChecked={numberAllowed}
            onChange={()=>setNumberAllowed((prev)=>!prev)}
            />
            <span>Allow Numbers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
         className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
         defaultChecked={characterAllowed}
            onChange={()=>setCharacterAllowed((prev)=>!prev)}
            />
            <span>Allow Characters</span>
          </label>
        </div>

        <div>
          <label htmlFor="range" className="block mb-2">Range : {length}</label>
          <input
            type="range"
            id="range"
         className="w-full"
            min={4}
            max={20}
            value={length}
            onChange={(event) => {setLength(event.target.value)}}
          />
        </div>

     
        <button
        className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={copyPwToClipboard}
        >
          Copy
        </button>
      </div>
    </div>
    </>
  )
}

export default App

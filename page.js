"use client"
import { useState, useCallback, useEffect, useRef} from "react"; 

function page () {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("")

  const passwordref = useRef(null)


  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()|?/><"

    for(let i =1; i <= length; i++){
      let char = Math.floor (Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


   }, [length,numberAllowed,charAllowed,setPassword])

   const copyPasswordToClickboard = useCallback(()=>{
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,9);
    window.navigator.clipboard.writeText(Password)

   },[Password])

   useEffect(()=>{
    PasswordGenerator()
   },[length,numberAllowed,charAllowed,PasswordGenerator])
  
  return (
   <>
   <h1 className="text-lg text-center text-black font-semibold italic">Password Generator</h1>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-700 bg-black-800">
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
      type="text"
      value={Password}
      className="outline-none w-full py-1 px-3"
      placeholder="password"
      readOnly
      ref={passwordref}
      />
      <button
      onClick={copyPasswordToClickboard}
       className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
      copy</button>
    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex item-center gap-x-1">
        <input
        type="range"
        min={8}
        max={100}
        value={length}
        className="cursor-pointer"
        onChange={(e)=>{setlength(e.target.value)}}
        />
        <label>length:{length}</label>
      </div>
      <div className="flex item-center gap-x-1">
        <input
        type="checkbox"
        defaultChecked = {numberAllowed}
        id="numberinput"
        onChange={()=>{
          setcharAllowed((prev)=> !prev);
        }}
        />
        <label htmlFor="numberinput">Numbers</label>
      </div>
      <div className="flex item-center gap-x-1">
        <input
        type="checkbox"
        defaultChecked={charAllowed}
        id="characterInput"
        onChange={()=>{
          setcharAllowed((prev)=> !prev )
        }}
        />
        <label htmlFor="characterInput">Character</label>
      </div>
    </div>
   </div>
   </>
  )
}

export default page
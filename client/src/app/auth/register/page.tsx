'use client'
import axios from 'axios';
import { useState } from "react";
import { useRouter } from "next/navigation";
import RedAlert from "@/app/components/RedAlert";
import style from '../auth.module.css'
import Image from 'next/image';
export default function Home() {
  const [cnpj , setCnpj] = useState('');
  const [name , setName] = useState('');
  const [store_desc , setDesc] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [password , setPassword] = useState('');
  const [alertClass , setAlertClass] = useState('hidden')
  const [alert , setAlert] = useState('');
  const router = useRouter();

  const validCnpj = (cnpj : string) => {
    cnpj = cnpj.replace(/\D/g, '')

    if (cnpj.length !== 14){
      return false
    }
    return true

  }


  const handleValue = (e  :any) => {
    e.preventDefault();
    const isValid = validCnpj(cnpj)
    setAlertClass('hidden');
    if(isValid === false){
      setAlert('Cnpj Informado Invaido')
      setAlertClass('');
    }
    else{
      axios.post('http://localhost:8082/api/auth/register' , {name , cnpj , password , store_desc })
      .then((res) => {
        router.push('/auth/login');
      }).catch((err) => {
        console.log(err.response.data.msg);
        setAlert(err.response.data.msg)
        setAlertClass('');
      })
    }

  }
  return (
    
    <div className="flex flex-col justify-center items-center text-white mt-4 mb-4">
      <div className={style.main_div}>

        <div className="flex justify-center items-center flex-col">
          <Image
           src='/mascote_sentado.png'
           width={250}
           height={250}
           />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Registro de Lojas
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <RedAlert alert={alert} alertClass={alertClass}/>
            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium leading-6 ">
                CNPJ
              </label>
              <div className="mt-2">
                <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  pattern="[0-9]"
                  maxLength={14}
                  onChange={(e) => setCnpj(e.target.value)}
                  max={11}
                  required
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset text-black p-1  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 ">
                  name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 p-1 ring-inset text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="desc" className="block text-sm font-medium leading-6 ">
                  Descrição da Loja
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="desc"
                  name="desc"
                  value={store_desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-1 text-black  shadow-sm ring-1 ring-inset   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {store_desc}
                </textarea>
              </div>
            </div>
            <div>
            
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                  password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-1  shadow-sm ring-1 ring-inset text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={(e) => (handleValue(e))}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <a href="/auth/login">Ja tem cadastro?</a>
          </form>
        </div>
      </div>
      </div>
  );
  }
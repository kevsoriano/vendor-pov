"use client";

import { useEffect, useState } from "react";
import '../App.css'

const BASE_URL = "http://localhost:8082";

interface Auth {
    email: string;
    password: string;
}

function SignIn() {
    // const [error, setError] = useState();
    const [, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState<Auth>();

    const handleSubmit = (formData: any) => {
        const email = formData.get("email")
        const password = formData.get("password")

        setCredentials({
            "email": email,
            "password": password
        })
    };

    useEffect(() => {
        const signin = async () => {
            if (credentials === undefined) {
                return
            }

            setIsLoading(true);

            try {
                const authData = {
                    "email": credentials?.email,
                    "password": credentials?.password
                }

                const response = await fetch(`http://localhost:8082/users/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "email": "admin@test.com",
                        "password": "12345678"
                    })
                })

                const token = response.headers.get('token');
                console.log(token);
                //  const response = await fetch(`http://localhost:8082/users?sort="asc"`, {
                //     headers: {
                //         'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzY29wZSI6W3siYXV0aG9yaXR5IjoiREVMRVRFIn0seyJhdXRob3JpdHkiOiJSRUFEIn0seyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn0seyJhdXRob3JpdHkiOiJXUklURSJ9XSwic3ViIjoiMzQ4NzAzNGItNjkwNS00N2VmLWExYjgtNThmMDM1MDcyMmNlIiwiZXhwIjoxNzY2MzM3OTA0LCJpYXQiOjE3NjYzMzc4Njh9.MTG0mKqGpFotuxLHndQXI2M8ap8RWJDwcRaJRlBskE-PVNIZRQdPSexK-00Rzk-h'
                //     }
                // });
                // console.log(response.headers.get("userId"))
            } catch (e: any) {
                console.log("Aborted");
            } finally {
                setIsLoading(false);
            }
        }

        signin()
    }, [credentials]);

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 w-[100vw] h-[100vh] bg-gray-50">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                        <form action={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <div className="flex h-6 shrink-0 items-center">
                                        <div className="group grid size-4 grid-cols-1">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                            />
                                            <svg
                                                fill="none"
                                                viewBox="0 0 14 14"
                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                            >
                                                <path
                                                    d="M3 8L6 11L11 3.5"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="opacity-0 group-has-checked:opacity-100"
                                                />
                                                <path
                                                    d="M3 7H11"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <label htmlFor="remember-me" className="block text-sm/6 text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm/6">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Create an account now
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignIn;
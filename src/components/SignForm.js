import React from 'react';
import { useFormik } from 'formik';
import useFetch from "./hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from 'react-router-dom';

export default function SignForm() {

    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser');
    const navigate = useNavigate();
    const {error, isPending, data: users} = useFetch('http://localhost:8000/users');

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        onSubmit: values => {
            const foundUser = users.find(user => user.username === values.login && user.password === values.password);
            if (foundUser) {
                setLoggedUser(foundUser);
                navigate('/');
                window.location.reload();
                console.log("user found");
            } else {
                console.log("user not found");
            }
        },
    });


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Zaloguj się do swojego konta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={formik.handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">
                                Login
                            </label>
                            <div className="mt-2">
                                <input
                                    name="login"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    onChange={formik.handleChange}
                                    value={formik.values.login}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Hasło
                                </label>
                                <div className="text-sm">
                                    {/*<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                                    {/*    Forgot password?*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Zaloguj
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Nie masz konta?{' '}
                        <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Zarejestruj się
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

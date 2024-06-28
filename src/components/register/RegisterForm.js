import React, {useState} from "react";
import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import Switch from '@mui/material/Switch';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';


export default function RegisterForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [location, setLocation] = useState('');
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');
    const [roles, setRoles] = useState(['user']);
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [unavailability, setUnavailability] = useState([]);
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    const handleSwitch = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        setRoles(isChecked ? ['user', 'sitter'] : ['user']);
    };

    const handleServiceChange = (event) => {
        const { name, checked } = event.target;
        setServices(prevServices => {
            if (checked) {
                return [...prevServices, name];
            } else {
                return prevServices.filter(service => service !== name);
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            id: uuid(),
            username,
            password,
            basicInfo: {
                name,
                surname,
                email,
                telephone,
                location,
                photo,
                description,
            },
            roles,
            pets,
            sitterInfo: {
                services,
                ratings,
                unavailability
            },
        };

        fetch('/api/users', {
            method: 'POST',
            headers: { ContentType: 'application/json' },
            body: JSON.stringify(newUser)
        }).then(() => {
            console.log('User added');
            navigate('/sign-in')
        })
        console.log(newUser);
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12 space-y-6">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Dane logowania</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Te dane będą potrzebne tylko do rejestracji Twojego konta.
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Login
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Hasło
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="password"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Email i numer telefonu potrzebujemy do rejestracji. Dodatkowo, będą je widzieć tylko
                            zweryfikowani i zalogowani użytkownicy.
                        </p>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                E-mail
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="telephone" className="block text-sm font-medium leading-6 text-gray-900">
                                Numer telefonu
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="telephone"
                                        value={telephone}
                                        required
                                        onChange={(e) => setTelephone(e.target.value)}
                                        autoComplete="telephone"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profil</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Poniższe dane będą wyświetlane w Twoim profilu.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Imię
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="first-name"
                                        value={name}
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="first-name"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nazwisko
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="last-name"
                                        value={surname}
                                        required
                                        onChange={(e) => setSurname(e.target.value)}
                                        autoComplete="last-name"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                Miasto
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="location"
                                        value={location}
                                        required
                                        onChange={(e) => setLocation(e.target.value)}
                                        autoComplete="location"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                O mnie
                            </label>
                            <div className="mt-2">
                <textarea
                    name="description"
                    rows={5}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Napisz coś o sobie i swoim doświadczeniu ze zwierzetami. Masz psa? Kota? A może jesteś świrem na punkcie królików?"
                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Zdjęcie profilowe
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true"/>
                                <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Zmień
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-base font-semibold leading-7 text-gray-900">Czy chcesz zostać opiekunem?</h2>
                <div className="text-sm leading-6 text-gray-900">
                    <Switch
                        checked={checked}
                        className="mx-auto"
                        onChange={handleSwitch}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                    <p className={`text-sm leading-6 text-gray-600 ${checked ? 'hidden' : ''}`}>
                        Możesz dołączyć do naszej sieci opiekunów. <br/> Bez zobowiązań. Ty wybierasz, czy chcesz się
                        zaangażować, czy od czasu do czasu wyjść na spacer z innymi zwierzakami. Albo po prostu nakarmić
                        i podrapać kota? Twój wybór!
                    </p>
                    <p className={`text-sm leading-6 text-gray-600 ${checked ? '' : 'hidden'}`}>
                        Dobry wybór!
                    </p>
                </div>

                <div className={`border-b border-gray-900/10 pb-12 ${checked ? '' : 'hidden'}`}>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Rodzaj usługi</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Wybierz w jakiej formie chcesz pomóc zwierzakom i ich właścicielom.
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Możesz wybrać jedną, możesz i wszystkie</legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            name="stay"
                                            type="checkbox"
                                            onChange={handleServiceChange}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                            <i className="fa-solid fa-house-user"></i> W domu u kogoś
                                        </label>
                                        <p className="text-gray-500">Nie wszystkie zwierzeta lubią przeprowadzki. Te
                                            bardziej strachliwe wolą przebywać w swojej bezpiecznej strefie.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            name="walk"
                                            type="checkbox"
                                            onChange={handleServiceChange}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="walk" className="font-medium text-gray-900">
                                            <i className="fa-solid fa-person-walking-with-cane"></i> Wyprowadzanie /
                                            Spacer
                                        </label>
                                        <p className="text-gray-500">Czasem trzeba kogoś wspomóc jednorazowo albo
                                            ogólnie w ciągu dnia i wyprowadzić psa/kota (lub innego futrzaka)</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            name="take"
                                            type="checkbox"
                                            onChange={handleServiceChange}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="stay" className="font-medium text-gray-900">
                                            <i className="fa-solid fa-house"></i> Opieka u siebie
                                        </label>
                                        <p className="text-gray-500">Zaopiekuj się pupilem, jak nie ma Pańci/Pańcia w
                                            domu. W tym przpadku stajesz się tymczasowym domem dla zwierzaka. Traktuj
                                            jak swoje!</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            name="feed"
                                            type="checkbox"
                                            onChange={handleServiceChange}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="feed" className="font-medium text-gray-900">
                                            <i className="fa-solid fa-bowl-rice"></i> Karmienie
                                        </label>
                                        <p className="text-gray-500">Nic prostszego. Przychodzisz, dajesz to co wszyscy lubią najbardziej, drapiesz za uchem i wychodzisz. 5min i po robocie!</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Wyjdź
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Zarejestruj mnie!
                </button>
            </div>
        </form>
    )
}

import React, {useContext} from "react";
import ServiceContext from "../ServiceContext";
import useFetch from "../../hooks/useFetch";


export default function SearchResults() {

    const {
        location,
        startDate,
        endDate,
        serviceSelected,
        petAmount,
        setPetAmount
    } = useContext(ServiceContext);

    const petType = [
        {id: 1, type: "dog", icon: "fa-solid fa-dog"},
        {id: 2, type: "cat", icon: "fa-solid fa-cat"},
        {id: 3, type: "caged", icon: "fa-solid fa-fish"}
    ]

    const {error, isPending, data: users} = useFetch('http://localhost:8000/users')

    if (!users) {
        return <div>No users</div>;
    }

    if (users) {
        // filter users
        const availableSitters = users.filter(user => {
            // user that is a sitter
            if (user.roles.includes("sitter")) {
                // and provides chosen service
                if (serviceSelected.some(service => user.sitterInfo.services.includes(service))) {
                    // in selected area
                    if (location === user.basicInfo.location || location === '') {
                        // is available that time, then return
                        return user.sitterInfo.unavailability.every(unavailability => {
                            const unavailableDate = new Date(unavailability.date);
                            return unavailableDate < new Date(startDate) || unavailableDate > new Date(endDate);
                        });
                    }
                }
            }
            return false;
        });


        return (
            <div className="results-container">
                {availableSitters.map(sitter => (
                    <div className="sitter-small-profile">
                        <div className="sitter-info">
                            <div className="sitter-photo">
                                <img src={sitter.basicInfo.photo} alt="profile photo"/>
                            </div>
                            <div className="sitter-bio">
                                <h4>{`${sitter.basicInfo.name} ${sitter.basicInfo.surname}`}</h4>
                                <p>{sitter.basicInfo.location}</p>
                                <p>Have:
                                    {sitter.pets.map(pet => {
                                        const petIcon = petType.find(p => p.type === pet.type)?.icon;
                                        return petIcon ? <i className={petIcon}></i> : "No pets";
                                    })}
                                </p>
                                <p>Rating: </p>
                            </div>
                            <button
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            ><i className="fa-regular fa-message"></i></button>
                        </div>
                        <div className="sitter-description">
                            <p>{sitter.basicInfo.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
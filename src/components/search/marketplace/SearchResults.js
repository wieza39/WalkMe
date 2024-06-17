import React, {useContext} from "react";
import ServiceContext from "../ServiceContext";
import useFetch from "../../hooks/useFetch";


export default function SearchResults() {

    const {
        location,
        setLocation,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        serviceSelected,
        setServiceSelected,
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
        const availableSitters = users.filter(user => {
            return user.roles.includes("sitter");
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
                            </div>
                        </div>
                        {/*<div className="sitter-pets">*/}
                        {/*    {sitter.pets.map(pet => (pet.type === petType.type) ? `${<i className='petType.icon'></i>}` : `No pets`)}*/}
                        {/*</div>*/}
                        <div className="sitter-descrption">
                            <p>{sitter.basicInfo.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
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


    const { error, isPending, data: users } = useFetch('http://localhost:8000/users')

    if(!users) {
        return <div>No users</div>;
    }

    if(users) {
    const availableSitters = users.filter(user => { user.roles.includes("sitter")});

        return (

            <div className="sitter-short-profile">
                {availableSitters.map(sitter => (
                    <div className="sitter-info">
                        <div className="sitter-photo">
                            <img src={sitter.basicInfo.photo} alt="profile photo" />
                        </div>
                        <div className="sitter-bio">
                            <h5>{`${sitter.basicInfo.name} ${sitter.basicInfo.surname}`}</h5>
                            <p>{sitter.basicInfo.location}</p>
                        </div>
                    </div>
                    <div className="sitter-descrption">
                        <p>{sitter.basicInfo.description}</p>
                    </div>
                ))}
            </div>
        )
    }


}
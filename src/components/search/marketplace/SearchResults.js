import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../../elements/Rating";

export default function SearchResults({ availableSitters }) {
    const navigate = useNavigate();

    if (!availableSitters || availableSitters.length === 0) {
        return <div className="not-found">No sitters found for your criteria.</div>;
    }

    const petType = [
        { id: 1, type: "dog", icon: "fa-solid fa-dog" },
        { id: 2, type: "cat", icon: "fa-solid fa-cat" },
        { id: 3, type: "caged", icon: "fa-solid fa-fish" }
    ];

    return (
        <div className="results-container">
            {availableSitters.map(sitter => (

                <div className="sitter-small-profile" key={sitter.id}>
                    <div className="sitter-info">
                        <div className="sitter-photo">
                            <img src={sitter.basicInfo.photo} alt="profile photo" />
                        </div>
                        <div className="sitter-bio">
                            <h4>{`${sitter.basicInfo.name} ${sitter.basicInfo.surname}`}</h4>
                            <p>{sitter.basicInfo.location}</p>
                            <p>Have:
                                {
                                    sitter.pets && sitter.pets.length > 0 ? (
                                        sitter.pets.map((pet, index) => {
                                            const petIcon = petType.find(p => p.type === pet.type)?.icon;
                                            return petIcon ? <i key={index} className={petIcon}></i> : "Unknown pet";
                                        })
                                    ) : (
                                        " no pets"
                                    )
                                }
                            </p>
                            <Rating ratings={sitter.sitterInfo.ratings} />
                        </div>
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        ><i className="fa-regular fa-message"></i></button>
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => navigate(`/sitter/${sitter.id}`)}
                        ><i className="fa-solid fa-id-card"></i></button>
                    </div>
                    <div className="sitter-description">
                        <p>{sitter.basicInfo.description}</p>
                    </div>
                </div>

            ))}
        </div>
    );
}

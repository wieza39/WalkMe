import React from "react";
import Rating from "../../elements/Rating";
import { Calendar } from 'primereact/calendar';




export default function SitterInfo({ sitter }) {

    const services = [
        {id: 1, name: "stay", icon: "fa-solid fa-house"},
        {id: 2, name: "walk", icon: "fa-solid fa-person-walking-with-cane"},
        {id: 3, name: "take", icon: "fa-solid fa-house-user"},
        {id: 4, name: "feed", icon: "fa-solid fa-bowl-rice"}
    ]

    return(
        <div className="sitter-info-container">
            <div className="sitter-info-details-container">
                <div className="sitter-info-photo">
                    <img src={sitter.basicInfo.photo} alt="avatar"/>
                </div>
                <div className="sitter-info-header">
                    <h2>{`${sitter.basicInfo.name} ${sitter.basicInfo.surname}`}</h2>
                </div>
                <div className="sitter-info-details">
                    <p>Miasto: {`${sitter.basicInfo.location}`}</p>
                    <div className="sitter-info-details-services">
                        <p>Usługi:
                            {sitter.sitterInfo.services.map(service => {
                                const serviceIcon = services.find(s => s.name === service)?.icon;
                                return serviceIcon ? <i className={serviceIcon}></i> : "";
                            })}
                        </p>
                    </div>
                    <div className="sitter-info-details-rating">
                        <Rating ratings={sitter.sitterInfo.ratings} />
                    </div>
                    <div className="sitter-info-details-actions">
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                        ><i className="fa-regular fa-calendar"></i></button>
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                        ><i className="fa-regular fa-message"></i></button>
                    </div>
                </div>
            </div>
            <div className="sitter-info-description">
                <div className="sitter-info-description-header">
                    O mnie
                </div>
                <div className="sitter-description">
                    <p>{sitter.basicInfo.description}</p>
                </div>
            </div>
        </div>
    )
}
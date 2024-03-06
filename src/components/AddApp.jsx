/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router';

const AddApp = () => {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [isWebsite, setWebsite] = useState(true)
    const [isValid, setValid] = useState(true)


    function toggleWebsite(value) {
        // Si l'entrée correspond à un site web, alors on stocke l'information dans la variable isWebsite.
        // setLocation est appelé pour stocker le lien entré par l'utilisateur un peu plus bas dans le code
        if (value === "Site web") {
            setWebsite(true)
        }
        // Sinon, on modifie l'emplacement de l'application pour qu'il corresponde à la sélection de l'utilisateur.
        else {
            setWebsite(false)
            setLocation(value)
        }
    }

    const { id } = useParams()
    const navigate = useNavigate()

    // Soumission du formulaire
    const handleSubmit = (e) => {
        // On bloque la réaction par défaut
        e.preventDefault();
        // Création de la nouvelle application dans l'API si l'app est un site web commençant par https:// ou si l'utilisateur a
        // sélectionné une des autres valeurs du formulaire.
        if ((isWebsite && location.startsWith('https://')) || (!isWebsite && location === "Installé sur ce poste")
            || (!isWebsite && location === "Installé dans Virtual Box") || (!isWebsite && location === "Installé dans VMWare")) {
            axios
                .post(`http://localhost:3006/apps`, { name, location, type_id: id })
                .then(
                    // puis retour à l'accueil
                    navigate('/')
                )
        }
        // Renvoie un message d'erreur si les données ne sont pas au bon format
        else setValid(false)
    }

    // Il faut définir goHome ici car on ne peut pas utiliser navigate dans un return()
    const goHome = () => {
        navigate('/')
    }

    return (
        <div className="flex items-center justify-center pt-[33vh]">
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center items-center bg-slate-100 p-8 rounded-md'>
                    <input
                        className='my-2 px-3 py-1 rounded-full border border-gray-600'
                        onChange={(e) => setName(e.target.value)} required
                        type="text" placeholder="Nom de l'application" />
                    <select className='my-2 px-3 py-1 rounded-full border border-gray-600' onChange={(e) => toggleWebsite(e.target.value)}>
                        <option value="Site web">Site web</option>
                        <option value="Installé sur ce poste">Installé sur ce poste</option>
                        <option value="Installé dans Virtual Box">Installé dans Virtual Box</option>
                        <option value="Installé dans VMWare">Installé dans VMWare</option>
                    </select>
                    {isWebsite && <input
                        className='my-2 px-3 py-1 rounded-full border border-gray-600'
                        onChange={(e) => setLocation(e.target.value)} required
                        type="text" placeholder="URL" />}
                    {!isValid && <div className='text-red-500'>Non valide</div>}
                    <div className="flex my-2">
                        <button className="bg-[#38876e] hover:bg-[#076a4b] text-white py-1 px-3 rounded-full">
                            Ajouter
                        </button>
                        <button
                            onClick={goHome}
                            className='text-white mx-1 px-3 py-1 rounded-full bg-[#38876e] hover:bg-[#076a4b]'>
                            Annuler
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
}

export default AddApp;

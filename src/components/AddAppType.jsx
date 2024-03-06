/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';

const AddAppType = () => {
    const [name, setName] = useState("")

    const navigate = useNavigate()

    // Soumission du formulaire
    const handleSubmit = (e) => {
        // On bloque la réaction par défaut
        e.preventDefault();
        // Création de la nouvelle catégorie d'application dans l'API
        axios
            .post(`http://localhost:3006/app-types`, { name })
            .then(
                // puis retour à l'accueil
                navigate('/')
            );
    };

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
                        value={name} onChange={(e) => setName(e.target.value)} required
                        type="text" placeholder="Nom de la catégorie" />
                    <div className="flex my-2 gap-x-1">
                        <button type='submit' className='bg-[#38876e] hover:bg-[#076a4b] text-white py-1 px-3 rounded-full'>
                            Ajouter
                        </button>
                        <button
                            onClick={goHome}
                            className='bg-[#38876e] hover:bg-[#076a4b] text-white py-1 px-3 rounded-full'>
                            Annuler
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddAppType;
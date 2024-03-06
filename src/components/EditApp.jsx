import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditApp = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [typeId, setTypeId] = useState('');
    const [isWebsite, setWebsite] = useState(true)
    const [isValid, setValid] = useState(true)

    function toggleWebsite(value) {
        // Si l'entrée correspond à un site web, alors on stocke l'information dans la variable isWebsite.
        // setLocation est appelé pour stocker le lien entré par l'utilisateur un peu plus bas dans le code
        if (value === "Site web") {
            setWebsite(true)
            // On vide la valeur de l'emplacement pour que l'aperçu dans le formulaire n'affiche pas "Site web"
            setLocation('')
        }
        // Sinon, on modifie l'emplacement de l'application pour qu'il corresponde à la sélection de l'utilisateur.
        else {
            setWebsite(false)
            setLocation(value)
        }
    }

    const { id } = useParams();
    const navigate = useNavigate()

    // On récupère les données stockées qui correcspondent à l'application qu'on veut modifier pour pouvoir afficher leur valeur
    // actuelle dans le formulaire
    useEffect(() => {
        axios.get("http://localhost:3006/apps/" + id)
            .then(response => {
                setName(response.data.name)
                setLocation(response.data.location)
                setTypeId(response.data.type_id)
            })
            .catch(error => console.log(error))
    }, [id])

    // Soumission du formulaire
    const handleSubmit = (e) => {
        // On bloque la réaction par défaut
        e.preventDefault();
        // Création de la nouvelle application dans l'API si l'app est un site web commençant par https:// ou si l'utilisateur a
        // sélectionné une des autres valeurs du formulaire.
        if ((isWebsite && location.startsWith('https://')) || (location === "Installé sur ce poste")
            || (location === "Installé dans Virtual Box") || (location === "Installé dans VMWare")) {
            setValid(true)
            axios.put("http://localhost:3006/apps/" + id, {
                name,
                location,
                type_id: typeId
            })
                // puis retour à l'accueil
                .then(
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
                        value={name}
                        onChange={(e) => setName(e.target.value)} required
                        type="text" placeholder="Nom de l'application" />
                    <select value={location} className='my-2 px-3 py-1 rounded-full border border-gray-600' onChange={(e) => toggleWebsite(e.target.value)}>
                        <option value="Site web">Site web</option>
                        <option value="Installé sur ce poste">Installé sur ce poste</option>
                        <option value="Installé dans Virtual Box">Installé dans Virtual Box</option>
                        <option value="Installé dans VMWare">Installé dans VMWare</option>
                    </select>
                    {isWebsite && !location.includes("Installé sur ce poste") && !location.includes("Installé dans Virtual Box") && !location.includes("Installé dans VMWare")
                        ? <input
                            className='my-2 px-3 py-1 rounded-full border border-gray-600'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)} required
                            type="text" placeholder="URL" />
                        : null}
                    {!isValid && <div className='text-red-500'>Non valide</div>}
                    <div className="flex my-2">
                        <button className="bg-[#38876e] hover:bg-[#076a4b] text-white py-1 px-3 rounded-full">
                            Modifier
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

export default EditApp;
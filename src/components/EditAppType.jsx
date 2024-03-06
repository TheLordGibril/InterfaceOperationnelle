import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditAppType = () => {
  const [name, setName] = useState('');

  const { id } = useParams();
  const navigate = useNavigate()

  // Dès qu'un nouveau type est créé, on actualise la liste des types d'application
  useEffect(() => {
    axios.get("http://localhost:3006/app-types/" + id)
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => console.log(error))
  }, [id])

  // Soumission du formulaire
  const handleSubmit = (e) => {
    // On bloque la réaction par défaut
    e.preventDefault()
    // Modification de la catégorie d'application dans l'API
    axios.put("http://localhost:3006/app-types/" + id, {
      name
    })
      .then(
        // puis retour à l'accueil
        navigate('/')
      )
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
            type="text" placeholder="Nom de la catégorie"
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <div className="flex my-2 gap-x-1">
            <button
              className='bg-[#38876e] hover:bg-[#076a4b] text-white py-1 px-3 rounded-full'>
              Modifier
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

export default EditAppType;
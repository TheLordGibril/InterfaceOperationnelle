import axios from "axios";
import { useEffect, useState } from "react";
import AppsList from "./AppsList";

const Home = () => {
  const [appTypes, setAppTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([])

  // Dès que la liste des applications (apps) est modifiée, on met à jour l'affiche des applications
  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:3006/apps")
      .then(response => {
        setApps(response.data)
      })
    setLoading(false)
  }, [apps.length])

  // Dès que la liste des catégories d'applications (appTypes) est modifiée, on met à jour l'affiche des applications
  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:3006/app-types")
      .then(response => {
        setAppTypes(response.data)
      })
    setLoading(false)
  }, [appTypes])


  const deleteApp = (id) => {
    axios.delete(`http://localhost:3006/apps/${id}`).then(() => {
      const newApps = apps.filter((apps) => apps.id !== id);
      setApps(newApps);
    }).catch(error => {
      console.log(error)
    });
  }

  const deleteAppType = (id) => {
    axios.delete(`http://localhost:3006/app-types/${id}`).then(() => {
      const newAppTypes = appTypes.filter((appTypes) => appTypes.id !== id);
      setAppTypes(newAppTypes);
    }).catch(error => {
      console.log(error)
    });
    // forEach pour la suppression en cascade des applications liées au type supprimé
    apps.forEach(app => {
      if (app.type_id === id) {
        deleteApp(app.id)
      }
    });
  }

  // Affichage des applications classées par type
  return (
    <AppsList
      appTypes={appTypes}
      apps={apps}
      loading={loading}
      deleteApp={deleteApp}
      deleteAppType={deleteAppType}
    />
  );
}

export default Home;
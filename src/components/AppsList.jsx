/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Popup } from "reactjs-popup"
import Masonry from '@mui/lab/Masonry';

function AppsList({ appTypes, apps, loading, deleteApp, deleteAppType }) {

  // Couleur du background lors de la confirmation de suppression d'un type ou d'une application
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

  // Selon l'emplacement de l'application, le lien de cette dernière peut varier (local ou en ligne)
  function handleURL(app) {
    // Les applications locales ont un lien de la forme appname:// et il est indispensable de référencer l'application dans l'éditeur de
    // registre pour que le lien lance l'application. Les instructions peuvent être retrouvées dans le document word fourni avec le code,
    // intitulé "Ajouter une application à l'éditeur de registre" ou alors ici :
    // https://stackoverflow.com/questions/80650/how-do-i-register-a-custom-url-protocol-in-windows)
    if (app.location == "Installé sur ce poste") {
      return (app.name.toLowerCase().replace(/\s/g, '').concat('', '://'))
    }
    // Les applications installées sur Virtual Box et VMWare redirigent respectivement sur virtualbox:// et vmware://
    // (il faut également les référencer dans l'éditeur de registre)
    else if (app.location === "Installé dans Virtual Box") {
      return ("virtualbox://")
    }
    else if (app.location === "Installé dans VMWare") {
      return ("vmware://")
    }
    // Les autres cas possibles (il ne reste que les liens internet) redirigent directement vers le lien fourni
    else return (app.location)
  }

  return (
    <div className='py-5 flex justify-center items-center m-5'>
      {loading && <p>loading ...</p>}
      {appTypes &&
        <Masonry columns={{ xs: 1, md: 2, lg: 4 }} spacing={3}>
          {/* Affichage des types d'applications */}
          {(appTypes.map((appType) =>
            <div className="flex flex-col gap-y-4" key={appType.id}>
              <div className="text-xl font-medium flex">
                <div className="self-center">{appType.name}</div>
                {/* Modifier un type */}
                <Link to={`/edit-type/${appType.id}`} className="pl-3 py-3">
                  <button
                    className='text-green-200'
                  ><img src="editer.png" alt="Modifier" onDragStart={(event) => event.preventDefault()} />
                  </button>
                </Link>
                {/* Supprimer un type */}
                <Popup trigger={<button
                  className='p-3 text-red-200'
                  onClick={() => deleteAppType(appType.id)}
                ><img src="bin.png" alt="Supprimer" onDragStart={(event) => event.preventDefault()} /></button>} modal {...{ overlayStyle }}>
                  {close => (<div className="p-4 modal h-[320px] w-[512px] bg-white rounded-md flex flex-col justify-evenly items-center">
                    <div className="text-lg">Voulez-vous vraiment supprimer la catégorie <span className="font-medium">{appType.name}</span> ?</div>
                    <div className="w-1/2 flex justify-around">
                      <button className="w-24 text-red-700 transition bg-red-400 hover:bg-red-500 p-2 rounded-md border border-red-700" onClick={() => deleteAppType(appType.id)}>
                        Supprimer
                      </button>
                      <button className="close w-24 bg-slate-100 transition hover:bg-slate-200 p-2 rounded-md" onClick={close}>
                        Annuler
                      </button>
                    </div>
                  </div>)}
                </Popup>
              </div>
              {/* Affichage des applications du type actuel */}
              {apps.filter(app => app.type_id === appType.id).map((app) =>
                <div className='flex justify-between h-20 bg-slate-100 rounded-md items-center shadow' key={app.id}>
                  <a href={handleURL(app)} target="_blank" className="flex flex-col w-5/6 h-full justify-center p-5" rel="noreferrer">
                    <div>
                      <p className="text-lg">{app.name}</p>
                      <p className="text-xs truncate">{app.location}</p>
                    </div>
                  </a>
                  <div className="flex flex-col">
                    {/* Modifier une application */}
                    <Link to={`/edit-app/${app.id}`}>
                      <button
                        className='w-10 h-10 text-green-200 transition bg-[#38876e] hover:bg-[#076a4b] rounded-tr-md'
                      ><img className="m-auto" src="editer.png" alt="Modifier" onDragStart={(event) => event.preventDefault()} />
                      </button>
                    </Link>
                    {/* Supprimer une application */}
                    <Popup trigger={<button type="button"
                      className='button w-10 h-10 text-red-200 transition bg-[#ef424e] hover:bg-[#ec1322] rounded-br-md bg-blend-overlay'>
                      <img className="m-auto" src="bin.png" alt="Supprimer" onDragStart={(event) => event.preventDefault()} />
                    </button>} modal {...{ overlayStyle }}>
                      {close => (<div className="p-4 modal h-[320px] w-[512px] bg-white rounded-md flex flex-col justify-evenly items-center">
                        <div className="text-lg">Voulez-vous vraiment supprimer le raccourci de <span className="font-medium">{app.name}</span> ?</div>
                        <div className="w-1/2 flex justify-around">
                          <button className="w-24 text-red-700 transition bg-red-400 hover:bg-red-500 p-2 rounded-md border border-red-700" onClick={() => deleteApp(app.id)}>
                            Supprimer
                          </button>
                          <button className="close w-24 bg-slate-100 transition hover:bg-slate-200 p-2 rounded-md" onClick={close}>
                            Annuler
                          </button>
                        </div>
                      </div>)}
                    </Popup>
                  </div>
                </div>)}
              <Link className="" to={`${appType.id}/create-app`}>
                <div className="flex border-2 border-dashed transition hover:border-solid rounded h-20 justify-center items-center text-xl bg-gray-100 hover:bg-gray-200 text-gray-500">+</div>
              </Link>
            </div>
          ))}
        </Masonry>
      }
    </div >
  )
}

export default AppsList;
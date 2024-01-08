import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { Contexte } from "./contexte/Contexte";

type CardType = {
  categorie: string;
  nom: string;
  prix: number;
  id_produit: number;
  pathImg: string;
};

function Card({ id_produit, categorie, nom, prix, pathImg }: CardType) {
  // const context = useContext(Contexte)
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <div className="max-w-[290px]">
      <div
        onClick={() => setDisplay(!display)}
        className="relative h-60 rounded-lg border bg-white"
      >
        <div className="relative mb-2 h-4/6">
          <span className="absolute bottom-0 left-0 m-2 flex items-center justify-center rounded-lg bg-white/60 px-3 py-0.5 text-xs text-black">
            {categorie}
          </span>
          {/* <img src={`${import.meta.env.VITE_APP_URL}${context.filteredItems[id_produit-1].pathImg}`} alt={`image ${nom}`} className='w-full h-full object-contain rounded-lg' /> */}
          <img
            src={`${import.meta.env.VITE_APP_SERVER_URL}/${pathImg}`}
            alt="IMAGE"
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
        <p className="flex justify-between px-1">
          <span className="text-sm font-light">
            {nom.length > 25 ? nom.substring(0, 24) + '...' : nom}
          </span>
          <span className="text-lg font-medium">Ar {prix}</span>
        </p>
        <div className=" text-end text-black">
          <button
            className="m-1 w-[50px] cursor-pointer rounded-md bg-primary  font-medium text-white"
            onClick={() => {
              navigate(`/produit/${id_produit}`);
            }}
          >
            See
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

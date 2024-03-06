/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom"

function Header() {

    return (
        <header className="bg-[#076a4b] h-20 w-full flex text-white items-center justify-between">
            <Link className="flex h-full items-center flex-wrap" to="/">
                <img className='h-full p-2' src="" alt="Logo" onDragStart={(event) => event.preventDefault()} />
                <div className="text-2xl">Interface Opérationnelle</div>
            </Link>
            <Link to="/create-type">
                <div className="transition rounded m-4 p-3 hover:bg-[#065f43]">Nouvelle catégorie</div>
            </Link>
        </header>
    )
}

export default Header
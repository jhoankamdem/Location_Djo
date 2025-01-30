import { NavLink } from "react-router-dom";

export default function SideMenu() {
  return (
    <div className="Side">
      <ul>
        <li>
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li>
          <NavLink to="/facture">Facturation</NavLink>
        </li>
        <li>
          <NavLink to="/contrat">Contrat</NavLink>
        </li>
        <li>
          <NavLink to="/locataire">Locataire</NavLink>
        </li>
        <li>
          <NavLink to="/divers">Divers</NavLink>
        </li>
      </ul>
      <footer>&copy; {new Date().getFullYear()} By GyTechFlow </footer>
    </div>
  );
}

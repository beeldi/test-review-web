import {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {fetchEquipments} from "../utils/fetchEquipments";

function HomePage() {
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        fetchEquipments().then((equipments) => setEquipments(equipments));
    }, [])

    const [pageCount, setPageCount] = useState(0);
    const [filterOption, setFilterOption] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const equipmentList = equipments.map(equipment => {
        const {name, domain, nbFaults, photo, brand, niveau, key } = equipment
        let shouldDisplay = false;
        switch (filterOption) {
            case 'name':
                shouldDisplay = name.toLowerCase().includes(filterValue.toLowerCase());
                break;
            case 'domain':
                shouldDisplay = domain.toLowerCase().includes(filterValue.toLowerCase());
                break;
            case 'brand':
                shouldDisplay = brand.toLowerCase().includes(filterValue.toLowerCase());
                break;
            case 'niveau':
                shouldDisplay = niveau.toLowerCase().includes(filterValue.toLowerCase());
                break;
            default:
                shouldDisplay = true;
        }
        if (!shouldDisplay) return null;

        return (
            <Link to={`${key}`}>
                <figure>
                    <img alt="equipement" src={photo}/>
                </figure>
                <div>
                    <p>{name}</p>
                    <p>{domain}</p>
                    <p>Nombre de défauts : {nbFaults}</p>
                </div>

            </Link>
        )
    }).filter(elem => elem !== null).slice(pageCount * 10, (pageCount + 1) * 10);

    return (
        <div>
            <h1>Liste des équipements</h1>
            <div>
                <input onChange={(event) => setFilterValue(event.target.value)} type="text" placeholder='Rechercher un item'/>
                <button type='submit'><img width={100} height={100} src="search.png" alt="search"/></button>
                <select onChange={(event) => setFilterOption(event.target.value)}>
                    <option value="name">nom</option>
                    <option value="domain">domaine</option>
                    <option value="brand">marque</option>
                    <option value="niveau">niveau</option>
                </select>
                <div>
                    {equipmentList}
                    <div>
                        <button disabled={pageCount === 0} onClick={() => setPageCount(count => count - 1)}>Précédent</button>
                        <button disabled={equipmentList.length < 10} onClick={() => setPageCount(count => count + 1)}>Suivant</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage

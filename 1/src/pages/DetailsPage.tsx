import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {fetchEquipments} from "../utils/fetchEquipments";
import {fetchCheckpoints} from "../utils/fetchCheckpoints";

function EquipmentPage() {
    const {id} = useParams();
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        fetchEquipments().then((equipments) => setEquipments(equipments));
    }, [id])

    const [checkpoints, setCheckpoints] = useState([]);
    const equipment = equipments.find((equipment) => equipment.key === id);


    useEffect(() => {
        fetchCheckpoints().then((checkpoints) => setCheckpoints(checkpoints.filter(elem => elem.equipmentKey === id)))
    }, [id])


    return (
        <div>
            <h1>Détails de l'équipement</h1>
            <section>
                <div>
                    <h2>{equipment.name}</h2>
                    <i>{equipment.domain}</i>
                </div>
                <img alt="equipement" width={100} height={100} src={equipment.photo}/>
            </section>
            <section>
                <header>Infos de l'équipement</header>
                <table>
                    <tbody>
                        <tr>
                            <td>Building</td>
                            <td>{equipment.building}</td>
                        </tr>
                        <tr>
                            <td>Niveau</td>
                            <td>{equipment.niveau}</td>
                        </tr>
                        <tr>
                            <td>Local</td>
                            <td>{equipment.local}</td>
                        </tr>
                        <tr>
                            <td>Quantité</td>
                            <td>{equipment.quantity}</td>
                        </tr>
                        <tr>
                            <td>Statut</td>
                            <td>{equipment.status}</td>
                        </tr>
                        <tr>
                            <td>Prise de note</td>
                            <td>{equipment.notes}</td>
                        </tr>
                        <tr>
                            <td>Nombre de défauts</td>
                            <td>{equipment.nbFaults}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <header>Caractéristiques de l'équipement</header>
                <table>
                    <tbody>
                        <tr>
                            <td>Domaine</td>
                            <td>{equipment.domain}</td>
                        </tr>
                        <tr>
                            <td>Marque</td>
                            <td>{equipment.brand}</td>
                        </tr>
                        <tr>
                            <td>Model</td>
                            <td>{equipment.model}</td>
                        </tr>
                        <tr>
                            <td>Numéro de serie</td>
                            <td>{equipment.serialNumber || '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <header>Liste des points de contrôle</header>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Défaut</th>
                            <th>Recommandation</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkpoints.map((checkpoint, index) => {
                        const name = checkpoint.name || '-'
                        const fault = checkpoint.fault || '-'
                        const recommandation = checkpoint.recommandation || '-'
                        const photo = checkpoint.photo ? <img alt="checkpoint" width={100} height={100} src={checkpoint.photo}></img> : '-';

                        return (
                            <tr key={index}>
                                <td>{name}</td>
                                <td>{fault}</td>
                                <td>{recommandation}</td>
                                <td>{photo}</td>
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default EquipmentPage

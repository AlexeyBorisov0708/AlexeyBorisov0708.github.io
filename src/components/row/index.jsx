import { Cell } from "../cell"

export const Row = ({ order }) => {
    return (
        <tr>
            <Cell value={order.id}></Cell>
            <Cell value={order.senderCity}></Cell>
            <Cell value={order.senderAdress}></Cell>
            <Cell value={order.recipientCity}></Cell>
            <Cell value={order.addressRecipient}></Cell>
            <Cell value={order.parcelWeight}></Cell>
            <Cell value={order.date}></Cell>

        </tr>
    )
}

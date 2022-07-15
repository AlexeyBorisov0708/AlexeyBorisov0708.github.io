import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Row } from './components/row';

function App() {
  const [data, setData] = useState(null)
  const [senderCity, setSenderCity] = useState("")
  const [senderAddress, setSenderAddress] = useState("")
  const [recipientCity, setRecipientCity] = useState("")
  const [addressRecipient, setAddressRecipient] = useState("")
  const [parcelWeight, setParcelWeight] = useState("")
  const [date, setDate] = useState("")

  const request = async () => {
    const response = await fetch("https://localhost:44395/api/", {
      method: "GET",
      headers: { "Accept": "application/json" }
    });
    if (response.ok == true) {
      const orders = await response.json();
      setData(orders)
    }
  }

  function GetFunctions(e, number) {
    switch (number) {
      case 1:
        setSenderCity(e);
        break;
      case 2:
        setSenderAddress(e);
        break;
      case 3:
        setRecipientCity(e);
        break;
      case 4:
        setAddressRecipient(e);
        break;
      case 5:
        setParcelWeight(e);
        break;
      case 6:
        setDate(e);
        break;
      default:
        break;
    }

  }

  async function createOrder(order) {

    const response = await fetch("https://localhost:44395/api/", {

      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        SenderCity: order.senderCity,
        SenderAdress: order.senderAdress,
        RecipientCity: order.recipientCity,
        AddressRecipient: order.addressRecipient,
        ParcelWeight: order.parcelWeight,
        Date: order.date,
      })
    });
    const newElementData = await response.json();
    setData(prevState => [...prevState, newElementData]);
  }
  async function editOrder(order) {
    const response = await fetch("https://localhost:44395/api/", {
      method: "PUT",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        id: order.id,
        SenderCity: order.senderCity,
        SenderAdress: order.senderAdress,
        RecipientCity: order.recipientCity,
        AddressRecipient: order.addressRecipient,
        ParcelWeight: order.parcelWeight,
        Date: order.date,
      })
    });
    if (response.ok === true) {
      const order = await response.json();
    }
    else {
      const error = await response.json();
      console.log(error.message);
    }
    if (response.ok === true) {
      const order = await response.json();
    }
    else {
      const error = await response.json();
      console.log(error.message);
    }
  }
  useEffect(() => {
    console.log(senderAddress)
  }, [senderAddress])

  useEffect(() => {
    request();
  }, [])
  function prepareDataForRequest(event) {
    event.preventDefault();
    createOrder({
      senderCity: senderCity,
      senderAdress: senderAddress,
      recipientCity: recipientCity,
      addressRecipient: addressRecipient,
      parcelWeight: parcelWeight,
      date: date,
    })
    reset();
  }
  function reset() {
    setSenderCity("");
    setSenderAddress("");
    setRecipientCity("");
    setAddressRecipient("");
    setParcelWeight("");
    setDate("");
  }
  return (
    <div className="App">
      <h2>Список заказов</h2>
      <form name="userForm" onSubmit={e => prepareDataForRequest(e)}>
        <input type="hidden" name="id" value="0" />
        <div className="mb-3">
          <label className="form-label" htmlFor="SenderCity">Город отправителя:</label>
          <input className="form-control" name="SenderCity" required value={senderCity} onChange={e => GetFunctions(e.target.value, 1)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="SenderAdress">Адрес отправителя:</label>
          <input className="form-control" name="SenderAdress" required value={senderAddress} onChange={e => GetFunctions(e.target.value, 2)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="RecipientCity">Город получателя:</label>
          <input className="form-control" name="RecipientCity" required value={recipientCity} onChange={e => GetFunctions(e.target.value, 3)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="AddressRecipient">Адрес получателя:</label>
          <input className="form-control" name="AddressRecipient" required value={addressRecipient} onChange={e => GetFunctions(e.target.value, 4)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="ParcelWeight">Вес груза:</label>
          <input className="form-control" name="ParcelWeight" required value={parcelWeight} onChange={e => GetFunctions(e.target.value, 5)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Date">Дата:</label>
          <input className="form-control" name="Date" required value={date} onChange={e => GetFunctions(e.target.value, 6)} />
        </div>
        <div className="mb-3">
          <input type="submit" className="btn btn-sm btn-primary" value="Сохранить" />
          <a className="btn btn-sm btn-primary" onClick={reset}>Сбросить</a>
        </div>
      </form>
      <table className="table table-condensed table-striped table-bordered">
        <thead><tr><th>Номер заказа</th><th>Город отправителя</th><th>Адрес отправителя</th><th>Город получателя</th><th>Адрес получателя</th><th>Вес груза</th><th>Дата</th><th></th></tr></thead>
        <tbody>
          {data?.map(order => (
            <Row order={order}></Row>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

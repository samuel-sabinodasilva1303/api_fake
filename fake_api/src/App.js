import './App.css';

import { useState, useEffect } from "react";
//importanto o hook que poderia ter sido criado
//impor { useFetch } from "./hooks/useFetch;"

const url = "http://localhost:3000/products";

function App() {

    const [ products, setProducts ] = useState([]);
    //const [data: items] = useFetch(url);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
//Com o Hook essa arrow não seria necessária

    useEffect(() => {
      async function fetchData() {

        const res = await fetch(url);
      
        const data = await res.json();
  
        setProducts(data);

    
      }
      fetchData();

    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const product = {
        name,
        price,
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
         body: JSON.stringify(product),
        });

        const addedProducts = await res.json()

        setProducts((prevProducts) => [...prevProducts, addedProducts]);

        setName("");
        setPrice("");
        

    };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>

    {/**Exemplo do código com o hook criado
     * 
     * {{items && items.map((product) => (
        <li key={product.id}>

          {product.name} - R$: {product.price}

        </li>
       ))} }
     */
     }
       {products.map((product) => (
        <li key={product.id}>
          {product.name} - R$: {product.price}
        </li>
       ))} 

      </ul>
      <hr></hr>
        <div className="add-product">
          <form onSubmit={handleSubmit}>
            <label>
              Nome
              <input 
              type="text" 
              value={name}  
              name="name" 
              onChange={(e) => setName(e.target.value)} 
              />
            </label>
    
            <label>
              Preço
              <input 
              type="text" 
              value={price}  
              name="price" 
              onChange={(e) => setPrice(e.target.value)} 
              />
            </label>
            <input type="submit" value="Criar" />
          </form>
        </div>
    </div>
  );
}

export default App;

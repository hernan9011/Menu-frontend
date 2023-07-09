import { command_Ticket } from "../js/export.js"
const today = new Date();

const month = (`0${today.getMonth() + 1}`).slice(-2); // Obtiene el mes actual con dos dígitos
const day = (`0${today.getDate()}`).slice(-2); // Obtiene el día actual con dos dígitos
const year = today.getFullYear();

commandFetch()
async function commandFetch() {
    try {
        const url = `fecha=${year}/${month}/${day}`;
        const response = await fetch(`https://localhost:7280/api/v1/Comanda?${url}`, {
            method: 'GET',
        })
        if (!response.ok) {
            throw new Error('Merchandise information could not be obtained');
        }
        const data = await response.json();
        commandToday(data);
    } catch (error) {
        console.error('Error obtaining merchandise data', error);
    }
}

function commandToday(command) {
    const listaCommand = document.getElementById('body-command');
    for (const element of command) {
        const item = document.createElement('div');
        item.id = 'command-today';
        item.classList.add('letter-command-today');
        item.innerHTML += command_Ticket(element)
        listaCommand.appendChild(item);
        const content = document.getElementById(`ticket-list${element.id}`);
        const array=[];
        element.mercaderias.forEach((merchandise) => {
            if (!array.includes(merchandise.nombre)) {
                array.push(merchandise.nombre);
               const item = document.createElement('li');
               item.id = 'ticket';
               item.classList.add('items');
               item.innerHTML = `
                    <p>1 X </p> 
                    <p>${merchandise.nombre}</p>
                    <p >${merchandise.precio}</p>`;
               content.appendChild(item);
   
               let count = 0;
               for (let i = 0; i < element.mercaderias.length; i++) {
                   if (element.mercaderias[i].nombre === merchandise.nombre) {
                       count++;
                   }
               }
              if(count > 1){
               item.innerHTML = `
                    <p>${count} X </p>
                    <p>${merchandise.nombre}</p>
                    <p>${count * merchandise.precio}</p>`;
              }           
           }
        });
    }


}


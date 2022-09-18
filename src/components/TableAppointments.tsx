export function TableAppointment() {
return (
  <div className="">
    <h2 className="text-2xl font-bold text-zinc-700 mb-4">Agendamentos do dia</h2>
      <table className="w-full text-sm text-left text-zinc-900">
          <thead className="text-xs text-zinc-900  bg-white-100 border-b ">
              <tr className="items-center justify-between ">
                  <th scope="col" className="py-3 px-6 ">
                      Cliente
                  </th>
                  <th scope="col" className=" py-3 px-6 ">
                      Serviço
                  </th>
                  <th scope="col" className=" py-3 px-6 ">
                      Horario
                  </th>
                  <th scope="col" className=" py-3 px-6 ">
                      Status
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <a href="#" className="text-md text-orange-500">Ver todos</a>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr className="border-b text-zinc-900  bg-white-100 ">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                      Tito Oliveira
                  </th>
                  <td className="py-4 px-6">
                      Corte - Barba
                  </td>
                  <td className="py-4 px-6">
                      11:00 - 12:00
                  </td>
                  <td className="py-4 px-6 text-center ">
                  <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Confirmado</span>
                  </td>
                  <td className="py-4 px-6">
                    Marcos Lopes
                  </td>
              </tr>
              <tr className="border-b text-zinc-900  bg-white-100 ">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Dbrow MC
                  </th>
                  <td className="py-4 px-6">
                    Barba
                  </td>
                  <td className="py-4 px-6">
                      14:00 - 14:30
                  </td>
                  <td className="py-4 px-6 text-center">
                  <span className="bg-red-100 text-red-900 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Cancelado</span>
                  </td>
                  <td className="py-4 px-6">
                    Claudio Maia
                  </td>
              </tr>
              <tr className="border-b text-zinc-900  bg-white-100 ">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Jonatas Serra
                  </th>
                  <td className="py-4 px-6">
                      Cabelo - Sobrancelha
                  </td>
                  <td className="py-4 px-6">
                      16:00 - 17:30
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="bg-orange-200 text-orange-700 text-sm font-medium mr-2 px-2.5 py-0.5 rounded text-center">Pendente</span>
                  </td>
                  <td className="py-4 px-6">
                    Gustavo Guedes
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
);
}
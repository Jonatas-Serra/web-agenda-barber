import CalendarPicker from './CalendarDash/CalendarPicker'
import { TableAppointment } from './TableAppointments'

export function Resume() {
  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-8 mx-4 mt-6">
        <div className="w-full grid grid-cols-12 gap-2">
          <div className="col-span-4 lg:col-span-4">
            <div className="flex flex-col p-6 bg-white-100 rounded-lg">
              <div className="flex justify-center items-center">
                <svg
                  className="w-11 h-11 md:w-14 md:h-14 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h1 className="font-bold text-center text-xs md:text-2xl text-green-600 ">
                Confirmados
              </h1>
              <p className="text-2xl text-zinc-700 font-bold text-center">11</p>
            </div>
          </div>
          <div className="col-span-4 lg:col-span-4">
            <div className="flex flex-col p-6 bg-white-100 rounded-lg">
              <div className="flex justify-center items-center">
                <svg
                  className="w-11 h-11 md:w-14 md:h-14 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h1 className="text-xs md:text-2xl text-orange-400 font-bold text-center">
                Pendentes
              </h1>
              <p className="text-2xl text-zinc-700 font-bold text-center">2</p>
            </div>
          </div>
          <div className="col-span-4 lg:col-span-4">
            <div className="flex flex-col p-6 bg-white-100 rounded-lg">
              <div className="flex justify-center items-center">
                <svg
                  className="w-11 h-11 md:w-14 md:h-14 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h1 className="text-xs md:text-2xl text-red-600 font-bold text-center">
                Cancelados
              </h1>
              <p className="text-2xl text-zinc-700 font-bold text-center">3</p>
            </div>
          </div>
        </div>
        <div className="col-span-4 mx-0 lg:mx-4 mt-2">
          <CalendarPicker />
        </div>
      </div>
      <div className="px-4 mt-4">
        <TableAppointment />
      </div>
    </div>
  )
}

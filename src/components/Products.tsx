import React, { useEffect, useState } from 'react'

import CardProduct from './CardProduct'
import CurrencyInput from 'react-currency-masked-input'

import api from '../services/api'
import PaginationProducts from './PaginationProducts'
import { useAuth } from '../hooks/Auth'
import { useToast } from '../hooks/Toast'

interface Products {
  barber: string
  _id: string
  name: string
  description: string
  price: number
  image: string

  handlemodalIsOpenDelete: (id: string) => void
  handleSelectProduct: (product: Products) => void
}

interface User {
  id: string
}

export function Products() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Products[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Products>(
    {} as Products,
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(8)
  const [width, setWidth] = useState(window.innerWidth)
  const token = localStorage.getItem('@AgendaBarber:token')
  const { addToast } = useToast()
  const user = useAuth().user as User

  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false)
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Get products
  const getProducts = async () => {
    const response = await api.get('products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setProducts(response.data)
    setLoading(false)
  }

  // Create product
  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const file = formData.get('image') as File
    const data = Object.fromEntries(formData)

    if (file) {
      const image = file as File
      const dataImage = new FormData()
      dataImage.append('file', image)

      const response = await api.post('products/upload', dataImage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      data.image = response.data.url
    }

    api
      .post('products', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        addToast({
          type: 'success',
          title: `${data.name} criado com sucesso!`,
        })
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro ao criar produto',
        })
      })

    setModalIsOpenCreate(false)
    setLoading(true)
    setTimeout(() => {
      getProducts()
    }, 2000)
  }

  // Delete product
  const handleDeleteProduct = async (_id: string) => {
    await api.delete(`/products/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setModalIsOpenDelete(false)
    setLoading(true)
    getProducts()
  }

  // Modify the number of products per page according to the screen size
  const handleResize = () => {
    setWidth(window.innerWidth)
    if (width < 640) {
      setProductsPerPage(4)
    }
    if (width >= 1150) {
      setProductsPerPage(6)
    }
    if (width >= 1220) {
      setProductsPerPage(8)
    }
  }

  // Open the modal to delete a product
  const handlemodalIsOpenDelete = () => {
    setModalIsOpenDelete(true)
  }

  // Select a product to be deleted or edited
  const handleSelectProduct = (product: Products) => {
    setSelectedProduct(product)
  }

  // Determine the index of the last product
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  // Inicialize the products
  useEffect(() => {
    getProducts()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize, width])

  return (
    <div className="flex flex-col w-full h-full md:h-[54.06rem] overflow-hidden">
      <div className="w-full flex justify-end">
        <button
          onClick={() => setModalIsOpenCreate(true)}
          className="justify-center font-bold text-xl px-5 py-3 my-3 mr-3 text-white-100 bg-orange-500 rounded-lg shadow-md hover:bg-orange-400"
        >
          Adicionar
        </button>
      </div>
      <div className="flex flex-wrap w-full justify-center px-8 sm:px-0 ml-4 md:ml-2">
        {loading ? (
          <div className="flex flex-1 justify-center items-center">
            <svg
              aria-hidden="true"
              className="mr-2 w-16 h-16 animate-spin text-gray-600 fill-orange-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          currentProducts.map((product: Products) => (
            <CardProduct
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              handlemodalIsOpenDelete={handlemodalIsOpenDelete}
              handleSelectProduct={handleSelectProduct}
              _id={product._id}
            />
          ))
        )}
        {modalIsOpenDelete && (
          <div className="relative h-full w-[100px] md:w-full">
            <div className="overflow-y-auto overflow-x-hidden fixed top-[5%] md:top-[20%] md:left-[30%] z-50  w-full md:h-full">
              <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative rounded-lg shadow bg-zinc-700">
                  <button
                    type="button"
                    onClick={() => setModalIsOpenDelete(false)}
                    className="absolute top-3 right-2.5 text-zinc-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-zinc-50"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <div className="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      className="mx-auto mb-4 w-14 h-14 text-red-500 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-zinc-50">
                      Você tem certeza que deseja deletar o produto{' '}
                      <strong className="font-bold text-lg text-red-500">
                        {selectedProduct.name}
                      </strong>
                      ?
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center">
                      <button
                        onClick={() => handleDeleteProduct(selectedProduct._id)}
                        className="mb-4 sm:mb-0 text-zinc-50 bg-red-500 hover:bg-red-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:mr-2"
                      >
                        Sim, Deletar
                      </button>
                      <button
                        onClick={() => setModalIsOpenDelete(false)}
                        className="rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-zinc-50 focus:z-10 bg-zinc-800 text-zinc-50 border-zinc-500 hover:bg-zinc-700"
                      >
                        Não, cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {modalIsOpenCreate && (
          <div className="relative h-full w-[100px] md:w-full">
            <div className="overflow-y-auto overflow-x-hidden fixed top-[10%] left-[0%] md:top-[20%] md:left-[35%] z-50  w-full md:h-full">
              <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                <div className="relative rounded-lg shadow bg-zinc-900">
                  <div className="flex justify-between items-center p-5 rounded-t border-b border-zinc-700">
                    <h3 className="text-xl font-medium text-zinc-50">
                      Adicionar novo serviço
                    </h3>
                    <button
                      onClick={() => setModalIsOpenCreate(false)}
                      type="button"
                      className="text-zinc-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-zinc-50"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <form onSubmit={handleCreateProduct}>
                    <div className="grid gap-6 mb-0 md:mb-6 md:grid-cols-2 p-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-50">
                          Nome do produto
                        </label>
                        <input
                          type="text"
                          name="barber"
                          value={user.id}
                          className="hidden"
                        />
                        <input
                          type="text"
                          name="name"
                          className="border text-sm font-medium rounded-lg  block w-full p-3 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">
                          Preço
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-zinc-50 font-bold text-base rounded-l-md border border-r-0 bg-zinc-700 border-zinc-600">
                            R$
                          </span>
                          <CurrencyInput
                            prefix="R$"
                            name="price"
                            min={0}
                            type="number"
                            pattern="^\d+(?:\.\d{1,2})?$"
                            className="bg-zinc-700 border-zinc-600 text-zinc-50 border font-bold text-base rounded-r-lg block w-full p-2.5"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="block  mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                          Descrição do produto
                        </label>
                        <input
                          type="text"
                          name="description"
                          className="border text-sm font-medium rounded-lg  block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-zinc-50"
                        />
                      </div>
                      <div className=" border-t border-zinc-700 col-span-2">
                        <label className="block mb-2 text-sm font-medium text-zinc-50">
                          Imagem do Produto
                        </label>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="block w-full text-sm rounded-lg border cursor-pointer text-zinc-50 focus:outline-none bg-zinc-700 border-zinc-600 placeholder-zinc-50"
                          aria-describedby="file_input_help"
                        />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                          JPEG, PNG ou JPG.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-2 md:p-6 space-x-2 rounded-b border-t border-zinc-700">
                      <button
                        type="submit"
                        className="text-white bg-orange-400 hover:bg-orange-500 hover:transition-shadow text-zinc-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setModalIsOpenCreate(false)
                          setSelectedProduct(null)
                        }}
                        className="text-white bg-red-500 hover:bg-red-600 text-zinc-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <PaginationProducts
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        setCurrentPage={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

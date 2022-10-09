import React, { useEffect, useState } from 'react'

interface PaginationProps {
  productsPerPage: number
  totalProducts: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
}

const PaginationProducts: React.FC<PaginationProps> = ({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const [pages, setPages] = useState<number[]>([])

  useEffect(() => {
    const pages = []
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pages.push(i)
    }
    setPages(pages)
  }, [totalProducts, productsPerPage])

  return (
    <div className="flex justify-center items-center">
      {pages.map((page) => (
        <button
          key={page}
          className={`${
            currentPage === page
              ? 'bg-orange-500 text-white-100'
              : 'bg-white-100 text-gray-900'
          } font-bold text-xl px-5 py-3 my-3 mr-3 rounded-lg shadow-md hover:bg-orange-400`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default PaginationProducts

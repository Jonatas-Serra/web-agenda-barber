import React from 'react'

interface TooltipProps {
  title: string
  className?: string
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <div className={`relative ${className}`}>
      <span className="text-center text-white-100 font-semibold opacity-0 w-[160px] bg-orange-500 p-2 rounded text-sm transition-opacity absolute bottom-[50%] left-[-50%] translate-x-[-55%] before:contents before:border-y-orange-500 before:border-x-transparent before:border-t-[6px] before:border-r-[6px] before:border-b-[0px] before:border-l-[6px] before:absolute before:top-[100%]  before:left-[-50%] before:translate-x-1/2 hover:opacity-100 hover:visible">
        {title}
      </span>
      {children}
    </div>
  )
}

export default Tooltip

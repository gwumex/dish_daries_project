'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const template = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<{ [key: string]: string }>({});
  const [heading, setHeading] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    const breadcrumbsList = pathname.trimStart().split("/").slice(1);
    const heading = breadcrumbsList.slice(breadcrumbsList.length - 2)[0]
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    setHeading(heading)

    const breadcrumbsObject: { [key: string]: string } = {};
    breadcrumbsList.forEach((segment, index, array) => {
      const path = '/' + array.slice(0, index + 1).join('/');
      breadcrumbsObject[segment] = path;
    });
    setBreadcrumbs(breadcrumbsObject);
  }, [pathname]);

  return (
    <div className="mt-24 p-8 ">
      <div className="text-sm breadcrumbs fixed bg-base-200 left-0 pl-6 pr-3 z-30 top-16  border-r-2 border-secondary rounded-br-lg border-opacity-60">
        <ul className='flex flex-wrap shrink overflow-hidden '>
          <li><Link href="/">Home</Link></li>
          {Object.entries(breadcrumbs).map(([key, value], index, array) => (

            <li key={index}>
              {index === array.length - 1 ? key : <Link href={value}>{key}</Link>}
            </li>
          ))}
        </ul>
      </div>
      <div className="">
      <div className="text-center">
          <h2 className="text-xl md:2xlfont-semibold">{heading}</h2>
          <hr className="my-6 border-gray-300" />
        </div>
        {children}
      </div>
    </div>
  )
}

export default template
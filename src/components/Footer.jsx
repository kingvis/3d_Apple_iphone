import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray text-xs">
            More ways to shop: {' '}
            <a
              href="https://www.apple.com/in/retail/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue hover:underline"
            >
              Find an Apple Store
            </a>{' '}
            or {' '}
            <a
              href="https://locate.apple.com/in/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue hover:underline"
            >
              other retailer
            </a>{' '}
            near you.
          </p>
          <p className="font-semibold text-gray text-xs">
            Or call 000800-040-1966
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
          <p className="font-semibold text-gray text-xs">Copyright @ 2025 Apple Inc. All rights reserved.</p>
          <div className="flex items-center flex-wrap justify-center md:justify-end w-full md:w-auto mt-2 md:mt-0">
            {footerLinks.map((link, i) => (
              <>
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray text-xs hover:underline mx-2"
                >
                  {link.label}
                </a>
                {i !== footerLinks.length - 1 && <span className="text-gray">|</span>}
              </>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center md:justify-end mt-2">
          <span className="text-xs text-gray-500">Created by Vissal | <a href="mailto:vissalv@gmail.com" className="underline hover:text-gray-300">vissalv@gmail.com</a></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
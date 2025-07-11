import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"

import VideoCarousel from './VideoCarousel';

const Highlights = () => {
  useGSAP(() => {
    gsap.to('#title', { opacity: 1, y: 0 })
    gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 })
  }, [])

  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">Get the highlights.</h1>

          <div className="flex flex-wrap items-end gap-5">
            <a
              href="https://www.apple.com/apple-events/"
              target="_blank"
              rel="noopener noreferrer"
              className="highlight-btn"
            >
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2 w-5 h-5 inline-block align-middle" />
            </a>
            <a
              href="https://www.apple.com/apple-events/"
              target="_blank"
              rel="noopener noreferrer"
              className="highlight-btn"
            >
              Watch the event
              <img src={rightImg} alt="right" className="ml-2 w-5 h-5 inline-block align-middle" />
            </a>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights
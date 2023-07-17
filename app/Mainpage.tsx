"use client"
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Image from "next/image";
import djImage from "public/dj.jpg"


const MainPage = ({ children }: { children: ReactNode }) => {
    const [scrollY, setScrollY] = useState(1141);
    const pageRef = useRef<HTMLDivElement>(null)

    // animate container transition to main page
    const animateArchContainer = useCallback(() => {
        const scaleImage = document.querySelector(".archway__content") as HTMLElement
        const archwayBg = document.querySelector(".archway") as HTMLElement
        const main = document.querySelector("body") as HTMLElement

        scaleImage.style.width = "100vw"
        scaleImage.style.height = "100vh"
        scaleImage.style.borderTopLeftRadius = "0";
        scaleImage.style.borderTopRightRadius = "0";
        scaleImage.style.opacity = ".6"
        scaleImage.style.transform = "scale(1)"
        scaleImage.style.transitionDuration = ".4s"
        scaleImage.style.transitionProperty = "all"
        archwayBg.style.backgroundColor = "#000"
        main.style.scrollSnapType = "y mandatory"
        main.style.scrollSnapAlign = "start"
        archwayBg.style.scrollSnapType = "y mandatory"
        archwayBg.style.scrollSnapAlign = "start"

        let requestId = requestAnimationFrame(animateArchContainer)
        cancelAnimationFrame(requestId)
    }, [])

    // animate image in arch
    const animateArch = useCallback(() => {
        const scaleRatio = (1141 - scrollY) / 1000
        const mainPage = document.querySelector(".mainPage") as HTMLElement
        mainPage.style.visibility = "hidden"

        const scaleImage = document.querySelector(".archway__content") as HTMLElement
        const archwayBg = document.querySelector(".archway") as HTMLElement
        scaleImage.style.width = "600px"
        scaleImage.style.height = "600px"
        scaleImage.style.opacity = "1"
        scaleImage.style.transform = `scale(${1 + scaleRatio})`
        scaleImage.style.borderTopLeftRadius = "50%";
        scaleImage.style.borderTopRightRadius = "50%";
        archwayBg.style.backgroundColor = "#ffecaf"

        let requestId = requestAnimationFrame(animateArch)
        cancelAnimationFrame(requestId)
    }, [scrollY])

    // show main page 
    const animateMainPage = useCallback(() => {
        const mainPage = document.querySelector(".mainPage") as HTMLElement
        const head = document.querySelector(".head") as HTMLElement
        mainPage.style.visibility = "visible"
        mainPage.style.transitionDuration = "1s"
        mainPage.style.transitionProperty = "all"

        head.style.transform = "translateY(5vh)"
        head.style.transitionDuration = ".3s"

        const requestId = requestAnimationFrame(animateMainPage)
        cancelAnimationFrame(requestId)
    }, [])

    // handle scroll 
    useEffect(() => {
        if (scrollY < 100) {
            console.log("called first")
            animateArchContainer()
            animateMainPage()
        } else {
            console.log("called")
            animateArch()
        }

    }, [scrollY, animateArchContainer, animateMainPage, animateArch])

    // get scroll Y
    const getScroll = useCallback(() => {
        const scroll = pageRef.current?.getBoundingClientRect()
        const scrollY = scroll?.y ?? 1141

        setScrollY(scrollY)
        console.log(scroll)
    }, [])

    // add eventlistener on scroll
    useEffect(() => {
        window.addEventListener("scroll", getScroll);

        return () => {
            window.removeEventListener("scroll", getScroll);
        }
    }, [getScroll]);


    return (
        <>
            <div className="archway" >
                <Image className="archway__content" src={djImage} alt="" width={500} height={600} />
            </div>
            <div className="mainPage" ref={pageRef}>
                <h1 className="head">DJ Raifu</h1>
                {children}
            </div>
        </>
    )
}

export default MainPage
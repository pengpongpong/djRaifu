"use client"
import React, { useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

type Props = {}

const LandingPage = (props: Props) => {
    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const borderTopLeftRadius = useTransform(scrollYProgress, [0, .99, 1], ["200px 200px", "200px 200px", "0 0"]);
    const borderTopRightRadius = useTransform(scrollYProgress, [0, .99, 1], ["200px 200px", "200px 200px", "0 0"]);
    const width = useTransform(scrollYProgress, [0, .99, 1], ["400px", "400px", "100vw"])
    const height = useTransform(scrollYProgress, [0, .99, 1], ["600px", "600px", "100vh"])
    const opacity = useTransform(scrollYProgress, [0, .99, 1], ["1", "1", ".7"])
    const backgroundColor = useTransform(scrollYProgress, [0, .99, 1], ["#e7e3d9", "#e7e3d9", "#000"])

    const landingRef = useRef<HTMLDivElement>(null)

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest === 1 && landingRef.current) {
            landingRef.current.style.visibility = "visible"
            landingRef.current.style.opacity = "1"
        } else if (latest !== 1 && landingRef.current) {
            landingRef.current.style.opacity = "0"
            landingRef.current.style.visibility = "hidden"
        }
    })


    return (
        <>
            <section className="hero">
                <motion.div
                    style={{
                        position: "fixed",
                        backgroundColor
                    }}
                    className="hero__container"
                >
                    <header className="hero__banner">
                        <h1 className="hero__banner__span">Get ready to dance!</h1>
                    </header>
                    <motion.img
                        style={{
                            scale,
                            borderTopLeftRadius,
                            borderTopRightRadius,
                            width,
                            height,
                            objectFit: "cover",
                            opacity
                        }}
                        className="hero__container__image"
                        src={"/dj.jpg"}
                    >
                    </motion.img>
                </motion.div>
            </section>

            <main className="landing" ref={landingRef}>
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item"><Link className="nav__link" href="">Home</Link></li>
                        <li className="nav__item"><Link className="nav__link" href="">Events</Link></li>
                        <li className="nav__item"> <Link className="nav__link" href="">About me</Link></li>
                        <li className="nav__item"><Link className="nav__link" href="">Kontakt</Link></li>
                    </ul>
                </nav>
                <section className="landing__textContainer">
                    <h2 className="landing__headline">Book DJ Raifu for your next event!</h2>
                    <h3 className="landing__sub-headline">Experience the beat!</h3>
                </section>
            </main>
        </>

    )
}

export default LandingPage
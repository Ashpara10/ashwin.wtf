"use client"

import Image from "next/image"
import Link from "next/link"
import MessagesList from "./guestbook/MessagesList"
import GoogleSignIn from "./guestbook/GoogleSignIn"
import GuestbookCard from "./guestbook/GuestbookCard"
import ContributionHeatmap from "./ContributionHeatmap"

const Landing = () => {
  const projects = [
    {
      logo: "/pluto.png",
      title: "Pluto",
      content: "AI Powered & Private Journaling app",
      link: "https://dub.sh/pluto.wtf"
    },
    {
      logo: "/rize.png",
      title: "Rize",
      content: "Own your story not just your resume",
      link: "https://www.rize.so/"
    }
  ]

  const socials = [
    { name: "GitHub", url: "https://github.com/Ashpara10", icon: "/github.png", invert: true },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ashwin-parande-657653294/", icon: "/linkedin.png" },
    { name: "Youtube", url: "https://www.youtube.com/@ashwinparande7076", icon: "/youtube.png" },
    { name: "X (Twitter)", url: "https://x.com/ashhhwwinnn", icon: "/x.png", invert: true },
    // {name:"Resume",url:"https://www.resume.io/r/ashwin-parande",icon:"/file.png"}
  ]
  return (
    <div className="max-w-3xl w-full flex flex-col px-4 md:p-0  mt-28 mx-auto">
      {/* <ContributionHeatmap/> */}
      <h2 className="font-serif text-xl md:text-2xl ">
        Hi there, I’m
        <span className="text-3xl md:text-4xl text-strong tracking-tight mt-1 block">
          Ashwin Parande 🌻 🌊
        </span>
      </h2>
      <div className="mt-6 md:text-lg">
        <p>
          I build for the web, automate the boring stuff, and occasionally ship something I&apos;m actually proud of.
          <br />
          <br />
          Developer based in India, I spend my days writing code, obsessing over good design, and playing football when my laptop needs a break.
          {/* Stuff that peaks my interests: */}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-6">
        {socials.map((social, i) => {
          return (
            <Link key={i} href={social.url} target="_blank" rel="noopener noreferrer">
              <button className="border flex flex-row items-center justify-center text-sm md:text-base rounded-lg border-border/40 cursor-pointer px-4 py-2">
                <Image src={social.icon} width={30} height={30} className={` shrink-0 mr-2 size-5 md:size-6 ${social.invert && "invert"}`} alt={`${social?.name}`} />
                {social.name}
              </button>
            </Link>
          )
        })}
      </div>

      <div className="mt-12">
        <h3 className="tracking-tight text-strong text-lg md:text-[1.375rem] mb-4">Works</h3>
        <div className="space-y-3 flex flex-col">
          {projects.map((project, index) => (
            <Link key={index} href={project.link} target="_blank" rel="noopener noreferrer">
              <div className="flex flex-row gap-4 items-start hover:bg-border/15 transitions-all duration-75 rounded-lg border border-border/40 p-4">
                <Image src={project.logo} width={50} className="size-10 md:size-12" height={50} alt={project.title} />
                <div className="flex flex-col items-start">
                  <h4 className="text-strong md:text-lg">{project.title}</h4>
                  <p className="text-sm md:text-base">{project.content}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="">

          <h3 className="tracking-tight text-strong text-lg md:text-[1.375rem] mb-2">Leave a message 🌱</h3>
          <p className="md:text-lg mb-6">
            Sign In with your google account to leave a message in the guestbook and see what others have to say!
          </p>
          <div className="mb-8">
<GuestbookCard/>
          </div>
        </div>


        <div className="rounded-xl w-full border border-border h-[180px] md:h-[320px] relative overflow-hidden">
          <Image src={"/output.png"} className="" fill style={{ objectFit: "cover" }} alt="" />
        </div>

        <div className="mt-6 md:text-lg ">
          <p className="[&>a]:text-yellow-400">
            I’m open to exploring new opportunities, collaborating on exciting projects, or simply connecting. Feel free to reach out via <a href="mailto:ashwinparande1156610c@gmail.com">Email ↗</a>, follow me on <a href="https://twitter.com/ashhhwwinnn">Twitter ↗</a>, or explore my work on <a href="https://github.com/AshPara10">GitHub↗</a>.
          </p>
        </div>
      </div>

      <div className="w-full  mt-20">
        <span className="text-[6.2rem] sm:text-[7rem] md:text-[8rem] lg:text-[13rem] font-medium bg-clip-text bg-linear-to-t mx-auto from-background to-strong text-transparent font-serif tracking-tighter block text-center leading-none">
          Ashwin
        </span>
      </div>
    </div>
  )
}

export default Landing

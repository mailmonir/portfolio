import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { AiOutlineSkype } from "react-icons/ai";
import { HiOutlineEnvelope } from "react-icons/hi2";
import Page from "@/app/components/page";

const About = () => {
  return (
    <Page>
      <div className="mx-auto max-w-4xl divide-y">
        <div className="pb-6">
          <div className="h-24 bg-sky-500 sm:h-20 lg:h-28" />
          <div className="mt-12 flow-root px-4 sm:mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-16">
            <div>
              <div className="-mt-1 flex">
                <div className="inline-flex overflow-hidden rounded-lg border-4 border-white">
                  <Image
                    src="/mislam.jpg"
                    alt="portfolio picture"
                    width={400}
                    height={400}
                    className="h-24 w-24 shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 sm:ml-6 sm:flex-1">
              <div>
                <div className="flex items-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Monirul Islam
                  </h3>
                  <span className="ml-2.5 inline-block h-2 w-2 shrink-0 rounded-full bg-green-400">
                    <span className="sr-only">Online</span>
                  </span>
                </div>
                <p className="text-sm text-gray-500n text-left">@mailmonir</p>
              </div>
              <div className="mt-5 space-y-3 md:flex md:space-y-0 md:space-x-3">
                <Link
                  href="/contact"
                  className="bg-sky-500 inline-flex w-full items-center justify-center rounded-md text-sm px-3 py-2 font-semibold text-white shadow hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  <HiOutlineEnvelope className="w-5 h-auto text-white mr-2" />
                  Message
                </Link>
                <a
                  href="https://wa.me/1749277075"
                  type="button"
                  className="bg-[#25d366] inline-flex w-full items-center justify-center rounded-md text-sm px-3 py-2 font-semibold text-white shadow hover:bg-[#27df6c]"
                >
                  <FaWhatsapp className="w-5 h-auto text-white mr-2" />
                  WhatsApp
                </a>
                <a
                  href="skype:monir.mnu?chat"
                  type="button"
                  className="bg-[#00aff0] inline-flex w-full items-center justify-center rounded-md text-sm px-3 py-2 font-semibold text-white shadow hover:bg-[#00baff]"
                >
                  <AiOutlineSkype className="w-5 h-auto text-white mr-2" />{" "}
                  Skype
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-0 sm:py-0">
          <dl className="abz ccr ccz cdb divide-y">
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium text-gray-900 sm:w-40 sm:shrink-0 lg:w-48">
                Bio
              </dt>
              <dd className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:ml-6 sm:mt-0">
                <p>
                  I served in the various private organizations as a Mechanical
                  Engineer for seventeen long years. From my student life, I had
                  a passion for computer programming, but had no opportunity to
                  move forward. Recently I&apos;ve quit my job and started
                  programming. I&apos;ve studied HTML, CSS, Javascript, React,
                  Nextjs, Node and Wordpress. I love Javascript, React and
                  Nextjs the most. I aim to become a full-fledged full stack
                  Javascript developer though I&apos;m quite good at Wordpress.
                  I think and believe that Javascript is the future.
                </p>
              </dd>
            </div>
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium text-gray-900 sm:w-40 sm:shrink-0 lg:w-48">
                Location
              </dt>
              <dd className="mt-1 text-sm text-gray-500 sm:grid-cols-2 sm:ml-6 sm:mt-0">
                Uttara, Dhaka, Bangladesh
              </dd>
            </div>
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium text-gray-900 sm:w-40 sm:shrink-0 lg:w-48">
                Website
              </dt>
              <dd className="mt-1 text-sm text-gray-500 sm:grid-cols-2 sm:ml-6 sm:mt-0">
                mislam.varcel.app
              </dd>
            </div>
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium text-gray-900 sm:w-40 sm:shrink-0 lg:w-48">
                Birthday
              </dt>
              <dd className="mt-1 text-sm text-gray-500 sm:grid-cols-2 sm:ml-6 sm:mt-0">
                <time dateTime="1982-06-23">August 09, 1975</time>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Page>
  );
};

export default About;

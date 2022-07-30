import Container from '../components/container'
import Image from 'next/image'

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            I'm Egor, 35 years old. I've worked on products that have reached hundreds of thousands of users, from the first sketch to the final design specification.
          </h1>
          <p>
             There were different types of products: analytical, financial, recruiting, construction, social, outsourcing, logistics, discount, cryptocurrency, administrative, banking, car rental, and patent service. 
Please have a look around in my portfolio.
          </p>

          <p>Deploy your own in a few minutes.</p>
        </div>
      </Container>

      <div className="container max-w-4xl m-auto px-4 mt-20">
        <Image
          src="/desk.jpg"
          alt="my desk"
          width={1920 / 2}
          height={1280 / 2}
        />
      </div>
    </>
  )
}

export default HomePage

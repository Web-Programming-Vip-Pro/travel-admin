const Loading = () => {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          >
            <div className="flex items-center justify-center h-full w-full">
              <h1 className="text-2xl text-white">Loading...</h1>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Loading

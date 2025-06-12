import ForecastPanel from './components/ForecastPanel';
import CurrentWeather from './components/CurrentWeather';

function App() {
  return (
    <main className="min-h-screen w-screen bg-gradient-to-b from-bg-dark to-bg-light grid grid-cols-12 p-10 py-4 ">
      <div className="col-span-12 md:col-span-3 md:col-start-2 flex justify-center md:justify-start my-4 lg:px-40">
        <CurrentWeather />
      </div>
      <div className="col-span-12 md:col-span-8 md:col-start-6 flex justify-center md:justify-start my-4">
        <ForecastPanel />
      </div>

      <footer className="text-center text-sm text-white col-span-12 md:col-span-4 md:col-start">
        Made with ❤️ by{' '}
        <a
          className="underline hover:cursor-pointer"
          href="https://github.com/TimeaKeresztes"
          target="_blank"
          rel="noreferrer"
        >
          Keresztes-Nagy Timea
        </a>
      </footer>
    </main>
  );
}

export default App;

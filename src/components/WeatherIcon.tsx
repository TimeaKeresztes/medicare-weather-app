import { CloudHail, Cloudy, MoonStar, Snowflake, Sun } from 'lucide-react';
import type { WeatherLabel } from '../types/definitions';

type WeatherIconProps = {
  label: WeatherLabel;
} & React.ComponentPropsWithoutRef<'svg'>;
export default function WeatherIcon({ label, ...rest }: WeatherIconProps) {
  const weatherLabelToIconMap = {
    Clear: <Sun {...rest} />,
    Cloudy: <Cloudy {...rest} />,
    Rainy: <CloudHail {...rest} />,
    Snowy: <Snowflake {...rest} />,
    Night: <MoonStar {...rest} />,
  };
  return weatherLabelToIconMap[label];
}

import Image from "next/image";

const defaultWidth = 304;
const defaultHeight = 448;

export interface LogoProps {
    width?: number,
    height?: number,
    scale?: number
};

export default function LivrumLogo({ width = defaultWidth, height = defaultHeight, scale = 1 }: LogoProps) {

    return (
        <Image alt="Livrum Logo" src="/livrum.png" width={width * scale} height={height * scale} />
    );
}

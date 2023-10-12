import SizableImage from "./SizableImage";

const defaultWidth = 304;
const defaultHeight = 448;

export interface LogoProps {
    /**
     * O caminho para a logo
     */
    src?: string;
    /**
     * A largura da imagem
     */
    width?: number;
    /**
     * A altura da imagem
     */
    height?: number;
    /**
     * A proporção da imagem
     */
    scale?: number;
}

const logoPath = require("/public/livrum.png");

/**
 * Esse componente permite exibir a logo da Livrum
 * de forma reutilizável.
 */
export default function LivrumLogo({ src = logoPath, width = defaultWidth, height = defaultHeight, scale = 1 }: LogoProps) {
    return <SizableImage src={src} alt="Livrum Logo" scale={scale} width={width} height={height} />;
}
